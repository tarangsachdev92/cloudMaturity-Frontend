import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AssessmentRouteConstants, MaturityLevelSchemaModel,
  PAGE_SIZE_OPTIONS, PagerModel, ConfirmationDialogComponent
} from '@app/utility';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaturityLevelSchemaService } from '../../services';
import { startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-maturity-level-schema-list',
  templateUrl: './maturity-level-schema-list.component.html',
  styleUrls: ['./maturity-level-schema-list.component.scss']
})
export class MaturityLevelSchemaListComponent implements OnInit, OnDestroy {

  searchFormControl: FormControl = new FormControl('');

  maturityLevelSchemaList: MaturityLevelSchemaModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  pager: PagerModel = { page: 1, recordsPerPage: this.pageSizeOptions[0], totalRecords: 0, filteredRecords: 0 };
  sortKey = 'schema_name';
  sortOrder = '-1';

  private searchSubscriber: Subscription;
  private listMaturitySubscription: Subscription;

  isLoadingResults = true;

  constructor(private _router: Router,
    public dialog: MatDialog,
    private _maturityLevelSchemaService: MaturityLevelSchemaService) { }

  ngOnInit() {
    this.initSearch();
  }

  initSearch = () => {
    this.searchSubscriber = this.searchFormControl.valueChanges.pipe(
      startWith({}),
      debounceTime(500),
      switchMap(() => {
        this.isLoadingResults = true;
        this.pager.page = 1;
        this.maturityLevelSchemaList = [];
        return this.getMaturityLevelSchemaList().pipe(
          catchError((error) => {
            this.isLoadingResults = false;
            return throwError(error);
          })
        );
      })
    ).subscribe((data) => this.handleMaturityLevelSchemaListResponse(data));
  }

  bindMaturityLevelSchema = () => {
    if (this.listMaturitySubscription) { this.listMaturitySubscription.unsubscribe(); }
    this.listMaturitySubscription = this.getMaturityLevelSchemaList().subscribe(response => {
      this.maturityLevelSchemaList = response.payload.data;
      this.pager = response.payload.pager;
    }, error => {
    });
  }

  handleMaturityLevelSchemaListResponse = (response) => {
    this.isLoadingResults = false;
    this.maturityLevelSchemaList = response.payload.data;
    this.pager = response.payload.pager;
  }

  getMaturityLevelSchemaList = (): Observable<any> => {
    return this._maturityLevelSchemaService.getMaturityLevelSchemaList(this.apiParams);
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
    this.bindMaturityLevelSchema();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindMaturityLevelSchema();
  }

  onEditMaturityLevelSchema = (maturityLevelSchema: MaturityLevelSchemaModel) => {
    this._router.navigate(['/' + AssessmentRouteConstants.EDIT_MATURITY_SCHEMA_LEVEL, maturityLevelSchema._id]);
  }

  onAddMaturityLevelSchema = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_MATURITY_SCHEMA_LEVEL]);
  }

  deleteMaturityLevelSchema = (id): Observable<any> => {
    return this._maturityLevelSchemaService.deleteMaturityLevelSchema(id);
  }

  onDeleteConfirmation(maturityLevelSchema: MaturityLevelSchemaModel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: 'Are you sure want to delete this maturity levels key ?', title: 'Delete Maturity levels key' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.submit) {
        this.deleteMaturityLevelSchema(maturityLevelSchema._id).subscribe(response => {
          this.bindMaturityLevelSchema();
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscriber) { this.searchSubscriber.unsubscribe(); }
    if (this.listMaturitySubscription) { this.listMaturitySubscription.unsubscribe(); }
  }
}
