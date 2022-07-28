import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AssessmentService } from "@app/core";
import { AssessmentModel, AssessmentRouteConstants, ConfirmationDialogComponent, saveFile } from "@app/utility";
import { forkJoin, Observable, Subscription } from "rxjs";


export enum AssessmentTabEnum {
  DASHBOARD = 0,
  ASSESSMENT_PLAN = 1,
  QUESTIONNAIRE = 2,
  SCOPE = 3,
}
@Component({
  selector: "app-assessment-survey-container",
  templateUrl: "./assessment-survey-container.component.html",
  styleUrls: ["./assessment-survey-container.component.scss"],
})
export class AssessmentSurveyContainerComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private sub: any;
  assessmentId: string;
  modelId: string;
  assessmentDetail;
  assessmentElementList = [];
  assessmentTeamList = [];
  assessmentDashboardData;
  assessmentDetailsSubscription$: Subscription;
  isLoadingResults = false;
  assessmentTabEnum = AssessmentTabEnum;
  selectedTabIndex: AssessmentTabEnum = AssessmentTabEnum.DASHBOARD;

  private deleteAssessmentSubscriber$: Subscription;
  deleteConfirmationDialogRef;

  @ViewChild("assessmentTab", { static: false }) assessmentTab: MatTabGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private assessmentService: AssessmentService
  ) { }

  ngOnInit() {
    this.routeSubscribe();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
    if (localStorage.getItem("highlightedRow")) {
      const tabGroup = this.assessmentTab;
      if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
      tabGroup.selectedIndex = AssessmentTabEnum.ASSESSMENT_PLAN;
    }
  }

  routeSubscribe = () => {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.assessmentId = params.assessmentId;
      this.modelId = params.modelId;
      if (this.assessmentId) {
        this.bindAssessmentData();
      }
    });
  };

  tabChanged = (tabChangeEvent: MatTabChangeEvent) => {
    this.selectedTabIndex = tabChangeEvent.index
  };

  bindAssessmentData = (isLoader = true) => {
    if (isLoader) this.isLoadingResults = true;
    const observables: Observable<any>[] = [];
    observables.push(this.getAssessmentDetail(this.assessmentId));
    observables.push(this.getAssessmentTeamList(this.assessmentId));
    observables.push(this.getAssessmentDashboard(this.assessmentId));
    if (this.assessmentDetailsSubscription$) {
      this.assessmentDetailsSubscription$.unsubscribe();
    }
    this.assessmentDetailsSubscription$ = forkJoin(observables).subscribe(
      (response) => {
        this.isLoadingResults = false;
        this.assessmentDetail = response[0].payload.data;
        this.assessmentElementList =
          JSON.parse(JSON.stringify(this.assessmentDetail.elements)) || [];
        const assessmentTeamResponse = response[1].payload.data;
        this.assessmentDashboardData = response[2].payload.data;
        this.assessmentTeamList = assessmentTeamResponse ? assessmentTeamResponse.members || []
          : [];
      },
      (error) => {
        this.onAssessmentList();
        this.isLoadingResults = false;
      }
    );
  };

  onPlanUpdate = (event) => {
    if (event) {
      this.bindAssessmentData(false);
    }
  }

  deleteAssessmentHandler = (assessmentId) => {
    this.onDeleteConfirmation(assessmentId);
  }

  onDeleteConfirmation(assessmentId): void {
    this.deleteConfirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this assessment?",
        title: `Delete Assessment`,
      },
    });

    this.deleteConfirmationDialogRef.componentInstance.shouldCloseFromDialog = false;
    const sub = this.deleteConfirmationDialogRef.componentInstance.confirm.subscribe(
      (event) => {
        if (event) {
          const { submit } = event;
          if (submit) {
            if (this.deleteAssessmentSubscriber$) {
              this.deleteAssessmentSubscriber$.unsubscribe();
            }
            this.deleteAssessmentSubscriber$ = this.deleteAssessment(assessmentId).subscribe((response) => {
              this.deleteConfirmationDialogRef.close({ success: true });
            });
          }
        }
      }
    );

    this.deleteConfirmationDialogRef.afterClosed().subscribe(({ success }) => {
      if (sub) sub.unsubscribe();
      if (success) this.onAssessmentList();
    });

  }

  deleteAssessment = (id): Observable<any> => {
    return this.assessmentService.deleteAssessment(id);
  };

  onClickPrintAssessmentReport = (assessmentDetail: AssessmentModel) => {
    if (assessmentDetail) {
      this.getAssessmentReport(assessmentDetail._id).subscribe(fileDownloadResponse => {
        saveFile(fileDownloadResponse, `Assessment_${assessmentDetail.assessment_unique_id}_report`);
      }, error => { });
    }
  }

  getAssessmentReport = (assessmentId) => {
    return this.assessmentService.getAssessmentReport(assessmentId);
  }

  onUpdateScopeDetail = (event) => {
    if (event) {
      const { details } = event;
      const params = { _id: this.assessmentId, details: details };
      this.updateAssessment(params).subscribe(response => {
        const assessmentDetail = response.payload.data;
        this.assessmentDetail = { ...this.assessmentDetail, ...assessmentDetail }
      }, error => { })
    }
  }

  updateAssessment = (params) => {
    return this.assessmentService.updateAssessment(params)
  }

  onAssessmentList = () => {
    this.router.navigate([`/${AssessmentRouteConstants.MODEL_ASSESSMENTS}`.replace(':modelId', this.modelId)]);
  }

  onAuthorityUpdate = (event) => {
    const { authority } = event;
    this.updateAuthority(authority).subscribe(
      (response) => {
        this.assessmentDetail.authorityType = authority;
      },
      (error) => {
        this.assessmentDetail = JSON.parse(
          JSON.stringify(this.assessmentDetail)
        );
      }
    );
  };

  updateAuthority = (authority) => {
    return this.assessmentService.updateAssessmentAuthority(
      authority,
      this.assessmentDetail._id
    );
  };

  getAssessmentDetail = (assessmentId) => {
    return this.assessmentService.getAssessmentDetail(assessmentId);
  };

  getAssessmentSurveyList = (assessmentId) => {
    return this.assessmentService.getAssessmentSurveyList(assessmentId);
  };

  getAssessmentTeamList = (assessmentId) => {
    return this.assessmentService.getAssessmentTeamList(assessmentId);
  };

  getAssessmentDashboard = (assessmentId) => {
    return this.assessmentService.getAssessmentDashboard(assessmentId);
  };

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.assessmentDetailsSubscription$) {
      this.assessmentDetailsSubscription$.unsubscribe();
    }
    if (this.deleteAssessmentSubscriber$) {
      this.deleteAssessmentSubscriber$.unsubscribe();
    }
  }
}
