import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/core';
import { AssessmentImprovementPlanService } from '@app/features/dashboard-module/services';
import { AssessmentRouteConstants, ConfirmationDialogComponent, FormBaseComponent, PagerModel, PAGE_SIZE_OPTIONS } from '@app/utility';
import { forkJoin, Observable, Subscription, throwError } from "rxjs";
import { catchError, debounceTime, startWith, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-model-improvement-list',
  templateUrl: './model-improvement-list.component.html',
  styleUrls: ['./model-improvement-list.component.scss']
})
export class ModelImprovementListComponent extends FormBaseComponent implements OnInit, OnDestroy {

  // Form Control Variables
  private sub: any;
  modelId;
  organisations = [];
  filterImprovementPlanForm: FormGroup;
  isLoadingResults = true;
  improvementPlanList = [];
  // Pagination related variables
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pager: PagerModel = {
    page: 1,
    recordsPerPage: this.pageSizeOptions[0],
    totalRecords: 0,
    filteredRecords: 0,
  };
  deleteConfirmationDialogRef;

  // State Variables
  isShowFilter = false;
  // Subscription variables
  private deleteAssessmentSubscriber$: Subscription;
  private listImprovementPlanSubscription$: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _commonService: CommonService,
    private _assessmentImprovementPlanService: AssessmentImprovementPlanService,
    _fb: FormBuilder,
    public dialog: MatDialog) {
    super(_fb);
  }

  ngOnInit() {
    this.modelId = this.activatedRoute.snapshot.params.modelId;
    this.createFilterForm();
    this.initSearch();
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.modelId = params['modelId'];
    });
    this.bindImprovementPlanRelatedData();
  }

  createFilterForm = () => {
    this.filterImprovementPlanForm = this.createForm({
      plan_id: ['', []],
      org_id: ['', []],
      valid_from: ['', []],
      valid_to: ['', []],
    });
  };

  initSearch = () => {
    this.listImprovementPlanSubscription$ = this.filterImprovementPlanForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          this.isLoadingResults = true;
          this.pager.page = 1;
          this.improvementPlanList = [];
          return this.getImprovementPlanList().pipe(
            catchError((error) => {
              this.isLoadingResults = false;
              return throwError(error);
            })
          );
        })
      )
      .subscribe((data) => this.handleImprovementPlanListResponse(data));
  };

  bindImprovementPlanList = () => {
    this.isLoadingResults = true;
    if (this.listImprovementPlanSubscription$) {
      this.listImprovementPlanSubscription$.unsubscribe();
    }
    this.improvementPlanList = [];
    this.listImprovementPlanSubscription$ = this.getImprovementPlanList().subscribe(
      (response) => {
        this.handleImprovementPlanListResponse(response);
      },
      (error) => {
        this.isLoadingResults = false;
      }
    );
  };

  handleImprovementPlanListResponse = (response) => {
    this.improvementPlanList = response.payload.data;
    this.pager = response.payload.pager;
    this.isLoadingResults = false;
  };

  getImprovementPlanList = (): Observable<any> => {
    return this._assessmentImprovementPlanService.getImprovementPlanList(this.apiParams);
  };

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const { plan_id, valid_to, org_id, valid_from } = this.filterImprovementPlanForm.value;
    const params: any = { page, recordsPerPage, model_id: this.modelId };
    if (org_id) {
      params.org_id = org_id;
    }
    if (valid_from) {
      params.valid_from = valid_from;
    }
    if (valid_to) {
      params.valid_to = valid_to;
    }
    if (plan_id) {
      params.plan_id = plan_id;
    }
    return params;
  }

  bindImprovementPlanRelatedData = () => {
    this.getOrganisations().subscribe((response) => {
      this.organisations = response.payload.data || [];
    });
  };

  getOrganisations = (): Observable<any> => {
    return this._commonService.getOrganisations();
  };

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  };

  onClearFilter = () => {
    this.filterImprovementPlanForm.reset();
  };

  onEditImprovementPlan = (ip) => {
    this.router.navigateByUrl(`${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLAN_DETAILS}/${ip._id}`
      .replace(':modelId', this.modelId));
  }

  onDeleteConfirmation(ip): void {
    this.deleteConfirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: `Are you sure want to delete this ${ip.plan_id} Improvement Plan?`,
        title: `Delete Improvement Plan`,
      },
    });

    const sub = this.deleteConfirmationDialogRef.componentInstance.confirm.subscribe(
      (event) => {
        if (event) {
          const { submit } = event;
          if (submit) {
            if (this.deleteAssessmentSubscriber$) {
              this.deleteAssessmentSubscriber$.unsubscribe();
            }
            this.deleteAssessmentSubscriber$ = this.deleteImprovementPlan(ip._id)
              .subscribe((response) => {
                this.bindImprovementPlanList()
                this.deleteConfirmationDialogRef.close({});
              });
          }
        }
      }
    );
    this.deleteConfirmationDialogRef.afterClosed().subscribe((result) => {
      if (sub) sub.unsubscribe();
    });
  }

  deleteImprovementPlan = (planId): Observable<any> => {
    return this._assessmentImprovementPlanService.deleteImprovementPlan(planId);
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindImprovementPlanList();
  };

  get isFilterApplied() {
    const { plan_id, valid_to, org_id, valid_from } = this.filterImprovementPlanForm.value;
    return plan_id || valid_to || org_id || valid_from;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.listImprovementPlanSubscription$) {
      this.listImprovementPlanSubscription$.unsubscribe();
    }
  }
}
