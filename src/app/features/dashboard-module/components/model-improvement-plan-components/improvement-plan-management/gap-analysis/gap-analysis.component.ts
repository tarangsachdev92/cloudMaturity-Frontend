import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AssessmentService } from "@app/core";
import { AssessmentImprovementPlanService } from "@app/features/dashboard-module/services";
import { assessmentCriteriaStatus, FormBaseComponent } from "@app/utility";
import { Subscription } from "rxjs";

@Component({
  selector: "app-gap-analysis",
  templateUrl: "./gap-analysis.component.html",
  styleUrls: ["./gap-analysis.component.scss"],
})
export class GapAnalysisComponent extends FormBaseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() improvementPlanId;
  @Input() improvementPlan;
  @Output() updateGapData = new EventEmitter<any>();

  gaugeType = "semi";
  gaugeLabel = "";
  gaugeAppendText = "%";
  gaugeSize = 140;
  gaugeThick = 9;
  gaugeClr = "rgb(214, 79, 79)";

  isShowFilter = false;
  selectedGap;
  gapAnalysisData;
  improvementPlanData;
  isGapAnalysisLoader = false;
  statusChoiceList = assessmentCriteriaStatus;
  levels = [];
  gapFilterForm: FormGroup;
  formValueChangeSubscriber$: Subscription;
  displayGapsData = [];

  constructor(private assessmentImprovementPlanService: AssessmentImprovementPlanService,
    private assessmentService: AssessmentService,
    public _fb: FormBuilder,) {
    super(_fb);
  }

  ngOnInit() {
    this.createGapFilterForm();
    this.formValueChangeSubscriber();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.improvementPlanId && changes.improvementPlanId.currentValue) {
      this.bindImprovementPlanGapAnalysis(changes.improvementPlanId.currentValue)
    }
    if (changes.improvementPlan && changes.improvementPlan.currentValue) {
      this.bindLevels(changes.improvementPlan.currentValue.model_id.max_level)
    }
  }

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  }

  createGapFilterForm = () => {
    this.gapFilterForm = this.createForm({
      element: [''],
      status: [''],
      level: [''],
      criteria_id: ['']
    });
  };

  formValueChangeSubscriber = () => {
    this.formValueChangeSubscriber$ = this.gapFilterForm.valueChanges.subscribe(
      (value) => {
        this.filterGapsData(this.gapAnalysisData.gaps);
      }
    );
  };

  onUpdateStatus = (event) => {
    const { status } = event;
    this.updateCriteriaStatus(status);
  }

  updateCriteriaStatus = (status) => {
    const params = {
      element_id: this.selectedGap.element_id,
      criteria_id: this.selectedGap.criteria_id,
      _id: this.improvementPlan &&
        this.improvementPlan.initial_assessment_id &&
        this.improvementPlan.initial_assessment_id._id,
      status: status ? 1 : this.selectedGap.initial_status,
    }
    this.assessmentService.updateSurvey(params).subscribe(response => {
      this.bindImprovementPlanGapAnalysis(this.improvementPlanId, false)
      this.updateGapData.emit(true);
    }, e => { })
  }

  bindImprovementPlanGapAnalysis = (improvementPlanId, isGapAnalysisLoader = true) => {
    if (isGapAnalysisLoader) {
      this.isGapAnalysisLoader = true;
    }
    this.getImprovementPlanGapAnalysis(improvementPlanId, isGapAnalysisLoader).subscribe(response => {
      this.gapAnalysisData = response.payload.gapAnalysis;
      this.improvementPlanData = response.payload.improvementPlan;
      this.isGapAnalysisLoader = false
      this.filterGapsData(this.gapAnalysisData.gaps);
      if (this.selectedGap) {
        this.onCriteriaGapDetails(this.selectedGap);
      }
    }, error => {
      this.isGapAnalysisLoader = false
    })
  }

  filterGapsData = (gapsArray) => {
    const displayGapsData = JSON.parse(JSON.stringify(gapsArray));
    this.displayGapsData = displayGapsData.filter(gap => {
      const isElementFilter = this.formControls['element'].value ? gap.element_id === this.formControls['element'].value : true;
      const isLevelFilter = this.formControls['level'].value ? +gap.criteria.level === +this.formControls['level'].value : true;
      const isStatusFilter = this.formControls['status'].value ? +gap.criteria.status === +this.formControls['status'].value : true;
      const isCriteriaFilter = this.formControls['criteria_id'].value ?
        gap.criteria.criteria_unique_id.toLowerCase().indexOf(this.formControls['criteria_id'].value.toLowerCase()) > -1 : true;
      return isElementFilter && isLevelFilter && isStatusFilter && isCriteriaFilter;
    })
  }

  getImprovementPlanGapAnalysis = (improvementPlanId, isGapAnalysisLoader) => {
    return this.assessmentImprovementPlanService.getImprovementPlanGapAnalysis(improvementPlanId, isGapAnalysisLoader)
  }

  generateImprovementPlanGap = (improvementPlanId) => {
    return this.assessmentImprovementPlanService.generateImprovementPlanGap(improvementPlanId)
  }

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  };

  onClearFilter = () => {
    this.gapFilterForm.patchValue({
      level: '',
      status: '',
      element: ''
    });
  };

  onGenerateGap = (improvementPlanId) => {
    if (improvementPlanId) {
      this.generateImprovementPlanGap(improvementPlanId).subscribe(response => {
        this.bindImprovementPlanGapAnalysis(improvementPlanId)
      }, error => { })
    }
  };

  onCriteriaGapDetails = (gap) => {
    this.getImprovementPlanGapById(this.improvementPlanId, gap._id).subscribe(
      response => {
        this.selectedGap = response.payload.gap;
      }, error => { })
  };

  getImprovementPlanGapById = (planId, gapId) => {
    return this.assessmentImprovementPlanService.getImprovementPlanGapById(planId, gapId)
  }

  onClickBack = () => {
    this.selectedGap = null;
  }

  getStatus = (status) => {
    const currentStatus = this.statusChoiceList.find(e => e.value === +status);
    return currentStatus && currentStatus.display || '';
  }

  getElementNameDescription = (element) => {
    return element ? `${element.element_name}-${element.description}` : '';
  }

  get formControls() {
    return this.gapFilterForm.controls;
  }

  ngOnDestroy() {
    if (this.formValueChangeSubscriber$) {
      this.formValueChangeSubscriber$.unsubscribe();
    }
  }

}
