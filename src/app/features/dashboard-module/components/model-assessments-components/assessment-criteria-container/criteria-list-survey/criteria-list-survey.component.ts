import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { AssessmentService } from "@app/core";
import {
  AssessmentRouteConstants,
  isCriteriaImplemented,
  isCriteriaNotImplemented,
  isCriteriaNotRated,
  isCriteriaPartiallyImplemented,
} from "@app/utility";

@Component({
  selector: "app-criteria-list-survey",
  templateUrl: "./criteria-list-survey.component.html",
  styleUrls: ["./criteria-list-survey.component.scss"],
})
export class CriteriaListSurveyComponent implements OnInit, OnChanges {
  // Angular related variables
  @Input() isSurveyUpdated;
  @Input() previousElement;
  @Input() nextElement;
  @Input() allChildElementList;
  @Input() selectedElement;
  @Input() selectedSurveyElement;
  @Input() assessmentDetail;
  @Input() assessmentId;
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<any>();
  @Output() selectElement = new EventEmitter<any>();
  @Output() updateSurveySuccess = new EventEmitter<any>();
  @ViewChild("tabGroup", { static: false }) tabGroup;

  practiceCtrl: FormControl = new FormControl("");

  // state variables
  selectedCriteria;
  panelOpenState = false;
  criteriaList = [];
  criteriaLoader = false;
  level = 1;
  levels = [];

  constructor(
    private assessmentService: AssessmentService,
    private _router: Router
  ) {
    this.assessmentService.setLevel(this.level);
  }

  ngOnInit() {
    if (this.assessmentDetail) {
      this.bindLevels(+this.assessmentDetail.max_level);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedElement) {
      const change = changes.selectedElement;
      if (
        (change.currentValue && !change.previousValue) ||
        (change.previousValue &&
          change.currentValue &&
          change.previousValue._id !== change.currentValue._id)
      ) {
        this.bindSurveyElementCriteria(
          this.assessmentId,
          this.selectedElement.element_id
        );
        this.practiceCtrl.setValue(this.selectedElement.element_id);
      }
    }
    if (changes.isSurveyUpdated) {
      const change = changes.isSurveyUpdated;
      if (change.currentValue) {
        this.bindSurveyElementCriteria(
          this.assessmentId,
          this.selectedElement.element_id,
          change.currentValue
        );
      }
    }
  }

  onSelectElement = (event) => {
    this.selectElement.emit({ elementId: event.value });
  };

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  };

  tabChanged = (tabChangeEvent: MatTabChangeEvent) => {
    this.bindSurveyElementCriteria(
      this.assessmentId,
      this.selectedElement.element_id
    );
  };

  onSelectCriteria = (criteria) => {
    this.selectedCriteria = null;
    // DO NOT REMOVE setTimeout
    // to recreate component and form -> so that data is not getting preserve
    setTimeout(() => {
      const criteriaOriginal = JSON.parse(
        JSON.stringify(this.criteriaList.find((el) => el._id === criteria._id))
      );
      this.selectedCriteria = criteriaOriginal;
    });
  };

  bindSurveyElementCriteria = (
    assessmentId,
    elementId,
    isSurveyUpdated = false
  ) => {
    if (!isSurveyUpdated) {
      this.selectedCriteria = null;
      this.criteriaList = [];
      this.criteriaLoader = true;
    }

    this.getSurveyElementCriteria(assessmentId, elementId).subscribe(
      (response) => {
        this.criteriaLoader = false;
        try {
          this.criteriaList = response.payload.data;
          const criteria =
            isSurveyUpdated && this.selectedCriteria
              ? this.criteriaList.find(
                  (el) => el._id === this.selectedCriteria._id
                )
              : this.criteriaList[0];
          this.selectedCriteria = JSON.parse(JSON.stringify(criteria));
        } catch (error) {
          this.selectedCriteria = null;
        }
      },
      (error) => {
        this.criteriaLoader = false;
      }
    );
  };

  getSurveyElementCriteria = (assessmentId, elementId) => {
    return this.assessmentService.getSurveyElementCriteria(
      assessmentId,
      elementId
    );
  };

  onSurveyUpdateFromSubmit = (event) => {
    const { params = {}, attachmentArray }: any = event;
    params._id = this.assessmentDetail._id;
    params.element_id = this.selectedCriteria.element_id;
    params.criteria_id = this.selectedCriteria.criteria_id;
    if (attachmentArray) {
      const fileArray = [{ reqKey: "attachments", files: attachmentArray }];
      this.updateSurveyData(params, fileArray);
    } else {
      this.updateSurveyData(params);
    }
  };

  onUpdateAssessmentCriteriaRequirement = (event) => {
    if (event && event.requirements) {
      const criteriaIndex = this.criteriaList.findIndex(
        (el) => el._id === this.selectedCriteria._id
      );
      this.criteriaList[criteriaIndex].requirements = event.requirements;
    }
  };

  updateSurveyData = (params, fileArray = []) => {
    this.updateSurvey(params, fileArray).subscribe(
      (response) => {
        this.updateSurveySuccess.emit({ data: response.payload.data });
      },
      (error) => {}
    );
  };

  updateSurvey = (params, fileArray = []) => {
    return this.assessmentService.updateSurvey(params, fileArray);
  };

  isNotStarted = (completedPercentage) => {
    return completedPercentage === 0;
  };

  isDone = (completedPercentage) => {
    return completedPercentage === 100;
  };

  isInProgress = (completedPercentage) => {
    return completedPercentage > 0 && completedPercentage < 100;
  };

  getStatus = (completedPercentage) => {
    let status = "";
    if (this.isNotStarted(completedPercentage)) {
      status = "Not Started";
    } else if (this.isDone(completedPercentage)) {
      status = "Done";
    } else if (this.isInProgress(completedPercentage)) {
      status = "In Progress";
    }
    return status;
  };

  onClickPrevious = () => {
    this.previous.emit();
  };
  onClickNext = () => {
    this.next.emit();
  };

  onBack = () => {
    if (this.assessmentDetail) {
      this._router.navigate([
        `/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL}`.replace(
          ":modelId",
          this.assessmentDetail.model_id
        ),
        this.assessmentDetail._id,
      ]);
    }
  };

  getCurrentScore = (selectedElement) => {
    let currentScore = 0;
    if (
      selectedElement &&
      selectedElement.score &&
      typeof selectedElement.score === "number"
    ) {
      currentScore = +selectedElement.score;
    }
    return currentScore;
  };

  get currentLevelCriteriaList() {
    const currentLevelCriteriaList: any[] = this.selectedElement.criterias.filter(
      (elem) => elem.level === this.level
    );
    return currentLevelCriteriaList;
  }

  isImplemented = (status) => {
    return isCriteriaImplemented(status);
  };

  isPartiallyImplemented = (status) => {
    return isCriteriaPartiallyImplemented(status);
  };

  isNotImplemented = (status) => {
    return isCriteriaNotImplemented(status);
  };

  isNotRated = (status) => {
    return isCriteriaNotRated(status);
  };

  get maxLevel() {
    return this.assessmentDetail && this.assessmentDetail.max_level
      ? this.assessmentDetail.max_level
      : 0;
  }

  get currentLevel() {
    return "1";
  }
}
