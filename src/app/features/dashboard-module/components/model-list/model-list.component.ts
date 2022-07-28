import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '@app/core';
import { AssessmentRouteConstants, MaturityLevelSchemaModel } from '@app/utility';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, startWith, switchMap } from "rxjs/operators";
import { AssessmentModelService } from '../../services';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit, OnDestroy {

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

  constructor(private _assessmentModelService: AssessmentModelService,
    private sharedService: SharedService,
    private _router: Router,
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
          return this.getAssessmentModelList().pipe(
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
    this.listAssessmentModelSubscription$ = this.getAssessmentModelList().subscribe(
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

  getAssessmentModelList = (): Observable<any> => {
    return this._assessmentModelService.getAssessmentModels(this.apiParams);
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
    this._router.navigate(['/' + AssessmentRouteConstants.MODEL_DETAILS, assessmentModel._id]);
  }

  onAddModel = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_MODEL]);
  }

  get isSuperAdmin() {
    return this.sharedService.isSuperAdmin();
  }

  ngOnDestroy() {
    if (this.searchSubscriber$) this.searchSubscriber$.unsubscribe();
    if (this.listAssessmentModelSubscription$) this.listAssessmentModelSubscription$.unsubscribe();
  }
}
