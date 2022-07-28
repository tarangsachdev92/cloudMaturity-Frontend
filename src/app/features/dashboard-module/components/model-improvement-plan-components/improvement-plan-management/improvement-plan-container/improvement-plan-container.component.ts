import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentImprovementPlanService, AssessmentModelService } from '@app/features/dashboard-module/services';
import { AssessmentRouteConstants, ConfirmationDialogComponent, saveFile } from '@app/utility';
import { forkJoin, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-improvement-plan-container',
  templateUrl: './improvement-plan-container.component.html',
  styleUrls: ['./improvement-plan-container.component.scss']
})
export class ImprovementPlanContainerComponent implements OnInit, OnDestroy {
  modelId;
  modelData;
  private sub: any;
  improvementPlanId: string;
  assessments;
  isAssessmentLoader = false;
  improvementPlan;
  selectedTabIndex = 0;
  deleteConfirmationDialogRef;
  private deleteImprovementPlanSubscriber$: Subscription;

  @ViewChild("tabGroupImprovementPlan", { static: false }) tabGroupImprovementPlan: MatTabGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private assessmentModelService: AssessmentModelService,
    private assessmentImprovementPlanService: AssessmentImprovementPlanService
  ) { }

  ngOnInit() {
    this.routeSubscribe();
  }

  routeSubscribe = () => {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.improvementPlanId = params.improvementPlanId;
      this.modelId = params.modelId;
      if (this.improvementPlanId) {
        this.bindPlanRelatedData();
      }
      if (this.modelId) {
        this.bindAssessmentModel(this.modelId);
      }
    });
  };


  bindAssessmentModel = (id) => {
    this.getAssessmentModel(id).subscribe(
      (response) => {
        this.modelData = response.payload.model;
      },
      (error) => { }
    );
  }


  getAssessmentModel = (id) => {
    return this.assessmentModelService.getAssessmentModelElementDetail(id);
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent) => {
    this.selectedTabIndex = tabChangeEvent.index
  };

  bindPlanRelatedData = (isLoader = true) => {
    if (isLoader) {
      this.isAssessmentLoader = true;
    }
    this.getPlanRelatedData().subscribe((response) => {
      this.improvementPlan = response[0].payload.improvementPlan;
      this.assessments = response[1].payload.assessments || [];
      this.isAssessmentLoader = false;
    }, error => {
      this.isAssessmentLoader = false;
    });
  }

  onUpdateGapData = (event) => {
    this.bindPlanRelatedData(false);
  }

  onSetImprovementPlanTargetHandler = (event) => {
    if (event && event.isTargetSet) {
      this.bindPlanRelatedData();
    }
  }

  getPlanRelatedData = () => {
    const observables = [
      this.getImprovementPlan(),
      this.getPlanAssessment(),
    ];
    return forkJoin(observables);
  }

  getPlanAssessment = (): Observable<any> => {
    return this.assessmentImprovementPlanService.getPlanAssessmentList(this.improvementPlanId);
  }

  getImprovementPlan = (): Observable<any> => {
    return this.assessmentImprovementPlanService.getImprovementPlan(this.improvementPlanId);
  }

  OnChangeAssessmentData = (event) => {
    this.bindPlanRelatedData();
  }

  deleteImprovementPlanHandler = (improvementPlanId) => {
    this.onDeleteConfirmation(improvementPlanId);
  }

  onDeleteConfirmation(improvementPlanId): void {
    this.deleteConfirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: `Are you sure want to delete this Improvement Plan?`,
        title: `Delete Improvement Plan`,
      },
    });
    this.deleteConfirmationDialogRef.componentInstance.shouldCloseFromDialog = false;
    const sub = this.deleteConfirmationDialogRef.componentInstance.confirm.subscribe(
      (event) => {
        if (event) {
          const { submit } = event;
          if (submit) {
            if (this.deleteImprovementPlanSubscriber$) {
              this.deleteImprovementPlanSubscriber$.unsubscribe();
            }
            this.deleteImprovementPlanSubscriber$ = this.deleteImprovementPlan(improvementPlanId)
              .subscribe((response) => {
                this.deleteConfirmationDialogRef.close({ success: true });
              });
          }
        }
      }
    );
    this.deleteConfirmationDialogRef.afterClosed().subscribe(({ success }) => {
      if (sub) sub.unsubscribe();
      if (success) this.onImprovementPlanList()
    });
  }

  deleteImprovementPlan = (planId): Observable<any> => {
    return this.assessmentImprovementPlanService.deleteImprovementPlan(planId);
  }

  onImprovementPlanList = () => {
    this.router.navigate([`/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLANS}`.replace(':modelId', this.modelId)])
  }

  onClickPrintImprovementPlanReport = (improvementPlan) => {
    if (improvementPlan) {
      this.getImprovementPlanReport(improvementPlan._id).subscribe(fileDownloadResponse => {
        saveFile(fileDownloadResponse, `ImprovementPlan_${improvementPlan.plan_id}_report`);
      }, error => { });
    }
  }

  getImprovementPlanReport = (planId) => {
    return this.assessmentImprovementPlanService.getImprovementPlanReport(planId);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.deleteImprovementPlanSubscriber$) {
      this.deleteImprovementPlanSubscriber$.unsubscribe();
    }
  }
}
