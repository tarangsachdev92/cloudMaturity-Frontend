import { Component, Input, OnInit } from "@angular/core";
import {
  AssessmentStatusEnum,
  assessmentStatuses,
  formatDecimal,
  retrieveScore,
} from "@app/utility";

@Component({
  selector: "app-survey-basic-details",
  templateUrl: "./survey-basic-details.component.html",
  styleUrls: ["./survey-basic-details.component.scss"],
})
export class SurveyBasicDetailsComponent implements OnInit {
  // Angular Variables
  @Input() assessmentDetail;

  constructor() { }

  ngOnInit() { }

  getStatus = (assessmentDetail) => {
    if (!assessmentDetail) {
      return "";
    }
    let status = "";
    const assessmentStatusObj = assessmentStatuses.filter(
      (elem) => +elem.value === +assessmentDetail.status
    )[0];
    if (assessmentStatusObj) {
      status = assessmentStatusObj.name;
    }
    return status;
  };

  isPending = (assessmentDetail) => {
    return (
      assessmentDetail &&
      assessmentDetail.status === AssessmentStatusEnum.PENDING
    );
  };

  isInProgress = (assessmentDetail) => {
    return (
      assessmentDetail &&
      assessmentDetail.status === AssessmentStatusEnum.IN_PROGRESS
    );
  };

  isCompleted = (assessmentDetail) => {
    return (
      assessmentDetail &&
      assessmentDetail.status === AssessmentStatusEnum.COMPLETED
    );
  };

  getFinalScore = (assessmentDetail) => {
    let score = 0;
    if (assessmentDetail) {
      score = retrieveScore(assessmentDetail.final_score);
    }
    return formatDecimal(score);
  };
}
