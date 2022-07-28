import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentRouteConstants, PagerModel, AssessmentScopeModel, PAGE_SIZE_OPTIONS, ConfirmationDialogComponent } from '@app/utility';
import { Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { AssessmentScopeService } from '../../services';

@Component({
  selector: 'app-assessment-scope-list',
  templateUrl: './assessment-scope-list.component.html',
  styleUrls: ['./assessment-scope-list.component.scss']
})
export class AssessmentScopeListComponent implements OnInit {

  searchFormControl: FormControl = new FormControl('');

  assessmentScopeList: AssessmentScopeModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS

  pager: PagerModel = { page: 1, recordsPerPage: this.pageSizeOptions[0], totalRecords: 0, filteredRecords: 0 };
  sortKey = 'name';
  sortOrder = '-1';

  isLoadingResults = true;

  constructor(private _router: Router,
    public dialog: MatDialog,
    private _assessmentScopeService: AssessmentScopeService) { }

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
        this.assessmentScopeList = [];
        return this.getAssessmentScopeList().pipe(
          catchError((error) => {
            this.isLoadingResults = false;
            return throwError(error);
          })
        );
      })
    ).subscribe((data) => this.handleAssessmentScopeListResponse(data));
  }

  bindAssessmentScope = () => {
    this.getAssessmentScopeList().subscribe(response => {
      this.assessmentScopeList = response.payload.data;
      this.pager = response.payload.pager;
    }, error => {
    })
  }

  handleAssessmentScopeListResponse = (response) => {
    this.isLoadingResults = false;
    this.assessmentScopeList = response.payload.data;
    this.pager = response.payload.pager;
  }

  getAssessmentScopeList = (): Observable<any> => {
    return this._assessmentScopeService.getAssessmentScopeList(this.apiParams);
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
    this.bindAssessmentScope();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindAssessmentScope()
  }

  onEditAssessmentScope = (assessmentScope: AssessmentScopeModel) => {
    this._router.navigate(['/' + AssessmentRouteConstants.EDIT_ASSESSMENT_SCOPE, assessmentScope._id]);
  }

  onAddAssessmentScope = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_ASSESSMENT_SCOPE]);
  }

  deleteAssessmentScope = (id): Observable<any> => {
    return this._assessmentScopeService.deleteAssessmentScope(id)
  }

  onDeleteConfirmation(assessmentScope: AssessmentScopeModel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: 'Are you sure want to delete this assessment scope?', title: 'Delete Assessment Scope' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.submit) {
        this.deleteAssessmentScope(assessmentScope._id).subscribe(response => {
          this.bindAssessmentScope();
        })
      }
    });
  }

}
