import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '@app/core';
import { AssessmentRouteConstants, MaturityLevelSchemaModel } from '@app/utility';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, startWith, switchMap } from "rxjs/operators";
@Component({
  selector: 'app-model-reference-list',
  templateUrl: './model-reference-list.component.html',
  styleUrls: ['./model-reference-list.component.scss']
})
export class ModelReferenceListComponent implements OnInit, OnDestroy {

  // Form control variables
  modelSearchCtrl: FormControl = new FormControl();

  // Data variables
  dialogRef;
  assessmentModelList: MaturityLevelSchemaModel[] = [];

  // Subscribe variables
  private searchSubscriber$: Subscription;
  private listAssessmentModelSubscription$: Subscription;

  // State variables
  isShowListView = false;
  isLoadingResults = true;

  constructor(private commonService: CommonService, private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initSearch();
  }

  onDashboardViewChange = (view) => {
    if (view === 'box') {
      this.isShowListView = false;
    } else {
      this.isShowListView = true;
    }
  }

  initSearch = () => {
    this.searchSubscriber$ = this.modelSearchCtrl.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          this.isLoadingResults = true;
          this.assessmentModelList = [];
          return this.getAssessmentReferenceModels().pipe(
            catchError((error) => {
              this.isLoadingResults = false;
              return throwError(error);
            })
          );
        })
      )
      .subscribe((data) => this.handleAssessmentModelListResponse(data));
  };

  bindAssessmentModelList = () => {
    if (this.listAssessmentModelSubscription$) {
      this.listAssessmentModelSubscription$.unsubscribe();
    }
    this.listAssessmentModelSubscription$ = this.getAssessmentReferenceModels().subscribe(
      (response) => {
        this.assessmentModelList = response.payload.data;
      },
      (error) => { }
    );
  };

  handleAssessmentModelListResponse = (response) => {
    this.isLoadingResults = false;
    this.assessmentModelList = response.payload.data;
  };

  getAssessmentReferenceModels = (): Observable<any> => {
    return this.commonService.getAssessmentReferenceModels(this.apiParams);
  };

  get apiParams() {
    const search = this.modelSearchCtrl.value;
    const params: any = {};
    if (search) {
      params.search = search;
    }
    return params;
  }

  onModelDetails = (assessmentModel) => {
    this._router.navigate(['/' + AssessmentRouteConstants.MODEL_REFERENCE_DETAILS, assessmentModel._id]);
  }

  onAddModel = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_MODEL]);
  }

  ngOnDestroy() {
    if (this.searchSubscriber$) this.searchSubscriber$.unsubscribe();
    if (this.listAssessmentModelSubscription$) this.listAssessmentModelSubscription$.unsubscribe();
  }

}
