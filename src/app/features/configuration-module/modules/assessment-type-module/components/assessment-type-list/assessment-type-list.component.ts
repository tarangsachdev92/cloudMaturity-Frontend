import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentRouteConstants, AssessmentTypeModel, PAGE_SIZE_OPTIONS, PagerModel, ConfirmationDialogComponent } from '@app/utility';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssessmentTypeService } from '../../services';
import { Observable, throwError } from 'rxjs';
import { startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-assessment-type-list',
  templateUrl: './assessment-type-list.component.html',
  styleUrls: ['./assessment-type-list.component.scss']
})
export class AssessmentTypeListComponent implements OnInit {

  searchFormControl: FormControl = new FormControl('');

  assessmentTypeList: AssessmentTypeModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS

  pager: PagerModel = { page: 1, recordsPerPage: this.pageSizeOptions[0], totalRecords: 0, filteredRecords: 0 };
  sortKey = 'name';
  sortOrder = '-1';

  isLoadingResults = true;

  constructor(private _router: Router,
    public dialog: MatDialog,
    private _assessmentTypeService: AssessmentTypeService) { }

  ngOnInit() {
    this.initSearch();
    // this.onDeleteConfirmation(null)
    // this.onEditAssessment(null)
  }

  initSearch = () => {
    this.searchFormControl.valueChanges.pipe(
      startWith({}),
      debounceTime(500),
      switchMap(() => {
        this.isLoadingResults = true;
        this.pager.page = 1;
        this.assessmentTypeList = [];
        return this.getAssessmentTypeList().pipe(
          catchError((error) => {
            this.isLoadingResults = false;
            return throwError(error);
          })
        );
      })
    ).subscribe((data) => this.handleAssessmentTypeListResponse(data));
  }

  bindAssessmentTypeList = () => {
    this.getAssessmentTypeList().subscribe(response => {
      this.assessmentTypeList = response['payload']['data'];
      this.pager = response['payload']['pager'];
    }, error => {
    })
  }

  handleAssessmentTypeListResponse = (response) => {
    this.isLoadingResults = false;
    this.assessmentTypeList = response['payload']['data'];
    this.pager = response['payload']['pager'];
  }

  getAssessmentTypeList = (): Observable<any> => {
    return this._assessmentTypeService.getAssessmentTypeList(this.apiParams)
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
    this.bindAssessmentTypeList();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindAssessmentTypeList()
  }

  onEditAssessmentType = (assessmentType: AssessmentTypeModel) => {
    this._router.navigate(['/' + AssessmentRouteConstants.EDIT_ASSESSMENT_TYPE, assessmentType._id]);
  }

  onAddAssessmentType = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_ASSESSMENT_TYPE]);
  }

  deleteAssessmentType = (id): Observable<any> => {
    return this._assessmentTypeService.deleteAssessmentType(id)
  }

  onDeleteConfirmation(assessmentType: AssessmentTypeModel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: 'Are you sure want to delete this assessment type?', title: 'Delete Assessment Type' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result['submit']) {
        this.deleteAssessmentType(assessmentType._id).subscribe(response => {
          this.bindAssessmentTypeList();
        })
      }
    });
  }
}
