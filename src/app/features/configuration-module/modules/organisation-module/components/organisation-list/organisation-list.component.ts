import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AssessmentRouteConstants,
  ConfirmationDialogComponent,
  PAGE_SIZE_OPTIONS,
  PagerModel,
} from '@app/utility';
import { MatDialog } from '@angular/material/dialog';
import { OrganisationModel } from '@app/utility/shared-model/organisation.model';
import { FormControl } from '@angular/forms';
import { OrganisationService } from '../../services';
import { startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Observable, throwError, Subscription } from 'rxjs';
import { AddSubOrganisationDialogComponent } from '../add-sub-organisation-dialog/add-sub-organisation-dialog.component';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss'],
})
export class OrganisationListComponent implements OnInit, OnDestroy {
  isSubOrganisation = false;

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _organisationService: OrganisationService
  ) { }

  // State Variables
  isApprove = true;
  data: any[] = [];

  organisationList: OrganisationModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  pager: PagerModel = {
    page: 1,
    recordsPerPage: this.pageSizeOptions[0],
    totalRecords: 0,
    filteredRecords: 0,
  };
  searchFormControl: FormControl = new FormControl('');
  sortKey = 'ornameg_name';
    sortOrder = '-1';

  isLoadingResults = true;

  private searchSubscriber: Subscription;
  private deleteOrganisationSubcription$: Subscription;
  private listOrganisationSubscription$: Subscription;

  ngOnInit() {
    this.initSearch();
  }

  initSearch = () => {
    this.searchSubscriber = this.searchFormControl.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          this.isLoadingResults = true;
          this.pager.page = 1;
          this.organisationList = [];
          return this.getOrganisationList().pipe(
            catchError((error) => {
              this.isLoadingResults = false;
              return throwError(error);
            })
          );
        })
      )
      .subscribe((response) => this.handleOrganisationsResponse(response));
  }

  bindOrganisationList = () => {
    if (this.listOrganisationSubscription$) {
      this.listOrganisationSubscription$.unsubscribe();
    }
    this.listOrganisationSubscription$ = this.getOrganisationList().subscribe(
      (response) => {
        // this.organisationList = response.payload.data;
        // this.pager = response.payload.pager;
        this.handleOrganisationsResponse(response);
      },
      (error) => { }
    );
  }

  prepareArray = (arr, arrList) => {
    for (const org of arrList) {
      const data = org;
      org.children = [];
      const subOrganizations = org.subOrganizations;
      arr.push({ data, children: org.children });
      if (subOrganizations && subOrganizations.length) {
        this.prepareArray(org.children, subOrganizations);
      }
    }
  }

  handleOrganisationsResponse = (response) => {
    this.isLoadingResults = false;
    this.organisationList = response.payload.data || [];
    this.pager = response.payload.pager;
    this.data = [];
    this.prepareArray(this.data, this.organisationList);
  }

  // handleCompaniesResponse = (response) => {
  //   this.isLoadingResults = false;
  //   this.organisationList = response.payload.data;
  //   this.pager = response.payload.pager;
  // }

  getOrganisationList = (): Observable<any> => {
    return this._organisationService.getOrganisationList(this.apiParams);
  }

  onAddSubOrganisation(organisation, isEdit = false): void {
    const dialogRef = this.dialog.open(AddSubOrganisationDialogComponent, {
      width: '500px',
      data: {
        parentOrganisation: isEdit ? organisation.parent.data : organisation.node.data,
        organisation: isEdit ? organisation.node.data : null
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.bindOrganisationList();
      }
    });
  }

  deleteOrganisation = (id): Observable<any> => {
    return this._organisationService.deleteOrganisation(id);
  }

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const search = this.searchFormControl.value;
    const sort = {};
    sort[this.sortKey] = this.sortOrder;
    const params: any = { page, recordsPerPage, sort: JSON.stringify(sort) };
    if (search) {
      params.search = search;
    }
    return params;
  }

  onClickSort(sortField, sortOrder) {
    this.sortKey = sortField;
    this.sortOrder = sortOrder;
    this.bindOrganisationList();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindOrganisationList();
  }

  onDeleteConfirmation(organisation): void {
    const orgData = organisation && organisation.node && organisation.node.data;
    if (orgData) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          message: 'Are you sure want to delete this organisation?',
          title: 'Delete Organisation',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.submit) {
          if (this.deleteOrganisationSubcription$) {
            this.deleteOrganisationSubcription$.unsubscribe();
          }
          this.deleteOrganisationSubcription$ = this.deleteOrganisation(
            orgData._id
          ).subscribe((response) => {
            this.bindOrganisationList();
          });
        }
      });
    }
  }

  onEditOrganisation = (organisation) => {
    const orgData = organisation && organisation.node && organisation.node.data;
    if (organisation.parent) {
      this.onAddSubOrganisation(organisation, true);
    } else {
      const organisationId = orgData && orgData._id;
      if (organisationId) {
        this._router.navigate([
          '/' + AssessmentRouteConstants.EDIT_ORGANISATION,
          organisationId
        ]);
      }
    }
  }

  onAddOrganisation = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_ORGANISATION]);
  }

  toggelSubOrganisation = (organisation: OrganisationModel) => {
    organisation.expanded = !organisation.expanded;
  }

  ngOnDestroy() {
    if (this.deleteOrganisationSubcription$) {
      this.deleteOrganisationSubcription$.unsubscribe();
    }
    if (this.listOrganisationSubscription$) {
      this.listOrganisationSubscription$.unsubscribe();
    }
    if (this.searchSubscriber) { this.searchSubscriber.unsubscribe(); }
  }
}
