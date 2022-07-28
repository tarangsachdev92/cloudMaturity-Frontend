import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { forkJoin, Observable, Subscription, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AssessmentModel,
  AssessmentRouteConstants,
  AssessmentStatusEnum,
  assessmentStatuses,
  ConfirmationDialogComponent,
  formatDecimal,
  FormBaseComponent,
  PagerModel,
  PAGE_SIZE_OPTIONS,
  retrieveScore,
} from "@app/utility";
import { catchError, debounceTime, startWith, switchMap } from "rxjs/operators";
import { AssessmentService, CommonService } from "@app/core";

@Component({
  selector: "app-model-assessment-list",
  templateUrl: "./model-assessment-list.component.html",
  styleUrls: ["./model-assessment-list.component.scss"],
})
export class ModelAssessmentListComponent extends FormBaseComponent implements OnInit {
  // Data related variables
  @Input() assessmentTypes = [];
  statusList = assessmentStatuses;
  assessmentList: AssessmentModel[] = [];
  private sub: any;
  modelId;
  organisations = [];
  userList = [];
  filterAssessmentForm: FormGroup;
  // Pagination related variables
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pager: PagerModel = {
    page: 1,
    recordsPerPage: this.pageSizeOptions[0],
    totalRecords: 0,
    filteredRecords: 0,
  };

  // Subscription variables
  private deleteAssessmentSubscriber$: Subscription;
  private listAssessmentSubscription$: Subscription;

  // State variables
  createdByName = "created_by_name";
  assessmentScopeName = "assessment_scope_name";
  isShowFilter = false;
  isLoadingResults = true;

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private _assessmentService: AssessmentService,
    private _commonService: CommonService,
    _fb: FormBuilder
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.createFilterForm();
    this.initSearch();
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.modelId = params['modelId'];
    });
    this.bindAssessmentRelatedData();
  }

  createFilterForm = () => {
    this.filterAssessmentForm = this.createForm({
      assessment_id: ['', []],
      assessment_type_id: ['', []],
      from_date: ['', []],
      to_date: ['', []],
      org_id: ['', []],
      status: ['', []],
      created_by: ['', []],
      final_score: ['', []],
    });
  };

  initSearch = () => {
    this.filterAssessmentForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          this.isLoadingResults = true;
          this.pager.page = 1;
          this.assessmentList = [];
          return this.getAssessmentList().pipe(
            catchError((error) => {
              this.isLoadingResults = false;
              return throwError(error);
            })
          );
        })
      )
      .subscribe((data) => this.handleAssessmentListResponse(data));
  };

  bindAssessmentRelatedData = () => {
    this.getFilterData().subscribe((response) => {
      this.organisations = response[0].payload.data || [];
      this.userList = response[1].payload.data || [];
    });
  };

  getFilterData = () => {
    const observables = [
      this.getOrganisations(),
      this.getUsers(),
    ];
    return forkJoin(observables);
  };

  getOrganisations = (): Observable<any> => {
    return this._commonService.getOrganisations();
  };

  getUsers = () => {
    // TODO remove page:1 as a required field from the api
    const params = { page: 1, recordsPerPage: 999999 };
    return this._commonService.getUserList(params);
  };

  bindAssessment = () => {
    this.isLoadingResults = true;
    if (this.listAssessmentSubscription$) {
      this.listAssessmentSubscription$.unsubscribe();
    }
    this.assessmentList = [];
    this.listAssessmentSubscription$ = this.getAssessmentList().subscribe(
      (response) => {
        this.handleAssessmentListResponse(response);
      },
      (error) => {
        this.isLoadingResults = false;
      }
    );
  };

  getFinalScore = (assessment) => {
    let score = 0;
    if (assessment) {
      score = retrieveScore(assessment.final_score);
    }
    return formatDecimal(score);
  };
  handleAssessmentListResponse = (response) => {
    this.assessmentList = response.payload.data;
    this.pager = response.payload.pager;
    this.isLoadingResults = false;
  };

  getAssessmentList = (): Observable<any> => {
    return this._assessmentService.getAssessmentList(this.apiParams);
  };

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const { assessment_id, created_by, to_date, final_score, org_id, from_date, assessment_type_id, status } = this.filterAssessmentForm.value;
    const params: any = { page, recordsPerPage, model_id: this.modelId };
    if (assessment_id) {
      params.search = assessment_id;
    }
    if (org_id) {
      params.org_id = org_id;
    }
    if (created_by) {
      params.created_by = created_by;
    }
    if (final_score) {
      params.final_score = final_score;
    }
    if (assessment_type_id) {
      params.assessment_type_id = assessment_type_id;
    }
    if (status) {
      params.status = status;
    }
    return params;
  }

  getStatus = (status) => {
    const assessmentStatus = assessmentStatuses.find(e => +e.value === +status)
    return assessmentStatus && assessmentStatus.name
  }
  get isFilterApplied() {
    const { assessment_id, created_by, to_date, org_id, from_date, status } = this.filterAssessmentForm.value;
    return assessment_id || created_by || to_date || org_id || from_date || status;
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindAssessment();
  };

  onDeleteConfirmation(assessment): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this assessment?",
        title: `Delete Assessment ${assessment.assessment_unique_id}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteAssessmentSubscriber$) {
          this.deleteAssessmentSubscriber$.unsubscribe();
        }
        this.deleteAssessmentSubscriber$ = this.deleteAssessment(
          assessment._id
        ).subscribe((response) => {
          this.bindAssessment();
        });
      }
    });
  }

  deleteAssessment = (id): Observable<any> => {
    return this._assessmentService.deleteAssessment(id);
  };

  onEditAssessment = (assessment) => {
    this._router.navigate([
      `/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL}`.replace(':modelId', this.modelId,),
      assessment._id
    ]);
  };

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  };

  onClearFilter = () => {
    this.filterAssessmentForm.reset();
  };

  isPending = (assessmentDetail) => {
    return (
      assessmentDetail &&
      assessmentDetail.status_ == AssessmentStatusEnum.PENDING
    );
  };

  isInProgress = (assessmentDetail) => {
    return (
      assessmentDetail &&
      assessmentDetail.status_ == AssessmentStatusEnum.IN_PROGRESS
    );
  };

  isCompleted = (assessmentDetail) => {
    return (
      assessmentDetail &&
      assessmentDetail.status_ == AssessmentStatusEnum.COMPLETED
    );
  };

  ngOnDestroy() {
    if (this.deleteAssessmentSubscriber$) {
      this.deleteAssessmentSubscriber$.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
