import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CommonService } from "@app/core";
import { AssessmentModelDataModel, AssessmentRouteConstants, AssessmentStatusEnum, assessmentStatuses, ConfirmationDialogComponent, retrieveScore } from "@app/utility";
import { ChartDataSets, ChartType, RadialChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import { Observable, Subscription } from "rxjs";
import { CreateAssessmentDialogComponent } from "../create-assessment-dialog/create-assessment-dialog.component";

@Component({
  selector: "app-assign-assessment",
  templateUrl: "./assign-assessment.component.html",
  styleUrls: ["./assign-assessment.component.scss"],
})
export class AssignAssessmentComponent implements OnInit, OnChanges {
  initialAssessment;
  otherAssessments = [];

  @Input() assessments = [];
  @Input() isLoadingAssessment = false;
  @Input() improvementPlan;
  @Input() modelData: AssessmentModelDataModel;

  @Output() changeAssessmentData = new EventEmitter<any>();
  step = 0;

  private deleteAssessmentSubscriber$: Subscription;

  dialogRef;

  radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      position: "right",
    },
    scale: {
      ticks: {
        max: 5,
        beginAtZero: true,
      },
    },
  };

  assetChartColors = [
    {
      backgroundColor: ["transparent"],
      borderColor: ["#d64f4f"],
    },
    {
      backgroundColor: ["transparent"],
      borderColor: ["#4fa4d6"],
    },
    {
      backgroundColor: ["transparent"],
      borderColor: ["#dc9d3f"],
    },
  ];
  chartLabels: Label[] = [
    "E01-01",
    "E01-02",
    "E01-03",
    "E01-04",
    "E01-05",
    "E01-06",
    "E01-07",
    "E01-08",
  ];

  chartData: ChartDataSets[] = [
    { data: [1, 2, 3, 4], label: "20-021" },
    { data: [1, 2, 5, 2], label: "20-022" },
    { data: [1, 4, 2, 1], label: "20-023" },
  ];

  public radarChartType: ChartType = "radar";

  constructor(public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.assessments && changes.assessments.currentValue) {
      this.initialAssessment = this.assessments.filter((el) => el.initial_assessment)[0];
      this.otherAssessments = this.assessments.filter((el) => !el.initial_assessment)
    }
  }

  onCreateAssessmentDialog = () => {
    if (this.modelData && this.improvementPlan) {
      this.dialogRef = this.dialog.open(CreateAssessmentDialogComponent, {
        width: "500px",
      });
      this.dialogRef.componentInstance.improvementPlan = this.improvementPlan;
      this.dialogRef.componentInstance.modelData = this.modelData;

      const sub = this.dialogRef.componentInstance.addAssessment.subscribe((event) => {
        if (event) {
          const { params } = event;
          this.saveAssessment(params);
        }
      });

      this.dialogRef.afterClosed().subscribe((response) => {
        if (response && response.submit) {
          this.changeAssessmentData.emit({ isAdd: true });
        }
        sub.unsubscribe();
      });
    }
  };

  saveAssessment = (params) => {
    params.improvement_plan_id = this.improvementPlan._id;
    this.commonService.createAssessment(params).subscribe(
      (response) => {
        if (this.dialogRef) {
          this.dialogRef.close({
            submit: true,
          });
        }
      },
      (error) => { }
    );
  };

  getFinalScore = (assessment) => {
    let score = 0;
    if (assessment) {
      score = retrieveScore(assessment.final_score);
    }
    return score > 0 ? score.toFixed(2) : score;
  };

  onDeleteAssessment(assessment): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: `Are you sure want to delete this assessment?${assessment.initial_assessment ? ' (Your all gap and target data will destroy.)' : ''}`,
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
          this.changeAssessmentData.emit({ isDelete: true, assessmentId: assessment._id });
        });
      }
    });
  }

  onAssessmentClick = (assessment) => {
    this.router.navigate([
      `/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL}`.replace(':modelId', assessment.model_id,),
      assessment._id
    ]);
  };

  deleteAssessment = (id): Observable<any> => {
    return this.commonService.deleteAssessment(id);
  };


  getStatus = (status) => {
    const assessmentStatus = assessmentStatuses.find(e => +e.value === +status)
    return assessmentStatus && assessmentStatus.name
  }

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
}
