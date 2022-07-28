import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AssessmentRouteConstants, ConfirmationDialogComponent, PagerModel, PAGE_SIZE_OPTIONS, PartnerModel } from '@app/utility';
import { startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PartnerService } from '../../services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  searchFormControl: FormControl = new FormControl('');

  partnerList: PartnerModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS

  pager: PagerModel = { page: 1, recordsPerPage: this.pageSizeOptions[0], totalRecords: 0, filteredRecords: 0 };
  sortKey = 'partner_name';
  sortOrder = '-1';

  isLoadingResults = true;

  constructor(private _router: Router,
    public dialog: MatDialog,
    private _partnerService: PartnerService) { }

  ngOnInit() {
    this.initSearch();
  }

  initSearch = () => {
    this.searchFormControl.valueChanges.pipe(
      startWith({}),
      debounceTime(500),
      switchMap(() => {
        this.isLoadingResults = true;
        this.pager.page = 1;
        this.partnerList = [];
        return this.getPartnerList().pipe(
          catchError((error) => {
            this.isLoadingResults = false;
            return throwError(error);
          })
        );
      })
    ).subscribe((data) => this.handlePartnersResponse(data));
  }

  bindPartnerList = () => {
    this.getPartnerList().subscribe(response => {
      this.partnerList = response['payload']['data'];
      this.pager = response['payload']['pager'];
    }, error => {
    })
  }

  handlePartnersResponse = (response) => {
    this.isLoadingResults = false;
    this.partnerList = response['payload']['data'];
    this.pager = response['payload']['pager'];
  }

  getPartnerList = (): Observable<any> => {
    return this._partnerService.getPartnerList(this.apiParams)
  }

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const search = this.searchFormControl.value;
    const sort = {};
    sort[this.sortKey] = this.sortOrder;
    const params = { page, recordsPerPage, sort: JSON.stringify(sort) };
    if (search) {
      params['search'] = search;
    }
    return params
  }

  onClickSort(sortField, sortOrder) {
    this.sortKey = sortField;
    this.sortOrder = sortOrder;
    this.bindPartnerList();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindPartnerList()
  }

  onEditPartner = (partner: PartnerModel) => {
    this._router.navigate(['/' + AssessmentRouteConstants.EDIT_PARTNER, partner._id]);
  }

  onAddPartner = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_PARTNER]);
  }

  deletePartner = (id): Observable<any> => {
    return this._partnerService.deletePartner(id)
  }

  onDeleteConfirmation(partner: PartnerModel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: 'Are you sure want to delete this partner?', title: 'Delete Partner' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result['submit']) {
        this.deletePartner(partner._id).subscribe(response => {
          this.bindPartnerList();
        })
      }
    });
  }
}
