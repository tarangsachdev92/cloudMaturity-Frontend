import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AssessmentImprovementPlanService } from "@app/features/dashboard-module/services";
import { TargetLayoutViewEnum, TargetViewEnum, retrieveScore, FormBaseComponent, targetTypesList } from "@app/utility";
import { TreeNode } from "primeng/api";
import { Observable } from "rxjs";
@Component({
  selector: "app-target-and-priorities",
  templateUrl: "./target-and-priorities.component.html",
  styleUrls: ["./target-and-priorities.component.scss"],
})
export class TargetAndPrioritiesComponent extends FormBaseComponent implements OnInit, OnChanges {
  @Input() improvementPlan;
  @Output() onSetImprovementPlanTarget = new EventEmitter<any>();

  // Data related variables
  files: TreeNode[];
  addTargetForm: FormGroup;

  viewTargetData: any[] = [];
  editTargetData: any[] = [];
  cols: any[];
  targetScoreList = [];
  // Enum variables
  targetViewEnum = TargetViewEnum;
  targetLayoutViewEnum = TargetLayoutViewEnum;
  isShowLayout = TargetLayoutViewEnum.NO_TARGET_ADDED;

  // State variables
  isAddTargetAllowed = false;
  displayErrorMessage = '';
  viewTargetMaxLevel;
  targetTypes = targetTypesList;
  isElementTargetLoader = false;

  constructor(public _fb: FormBuilder,
    private assessmentImprovementPlanService: AssessmentImprovementPlanService) {
    super(_fb);
  }

  ngOnInit() {
    this.createTargetForm();
    this.cols = [
      { field: "element", header: "Domain" },
      { field: "score", header: "Score" },
      { field: "priority", header: "Priority" },
    ];
  }

  createTargetForm = () => {
    this.addTargetForm = this.createForm({
      target_type: ['', []],
      target: ['', []]
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.improvementPlan) {
      const change = changes.improvementPlan;
      if (change.currentValue) {
        this.viewTargetData = [];
        this.editTargetData = [];
        this.handleDisplayTargetScreen(this.improvementPlan);
      }
    }
  }

  handleDisplayTargetScreen = (improvementPlan) => {
    const { initial_assessment_id = null, target = null } = improvementPlan;
    if (initial_assessment_id) {
      if (initial_assessment_id.completedPercentage !== 100) {
        this.displayErrorMessage = 'You haven’t completed initial assessment, please complete initial assessment and then create a target.'
      } else if (initial_assessment_id.completedPercentage === 100 && !target) {
        this.isAddTargetAllowed = true;
        this.displayErrorMessage = 'No any target added yet, you can add target.';
        this.bindElementTargetData(improvementPlan, true);
      } else if (initial_assessment_id.completedPercentage === 100 && target) {
        this.bindElementTargetData(improvementPlan);
        this.isShowLayout = this.targetLayoutViewEnum.PREVIEW_TARGET;
      }
    } else {
      this.displayErrorMessage = 'There is not initial assessment create one.'
    }
  }

  prepareArray = (arr, arrList, isExpand) => {
    for (const element of arrList) {
      const data = element;
      element.children = [];
      const subElements = element.subElements;
      data.haveChild = subElements.length > 0;
      arr.push({ data, children: element.children, expanded: isExpand && subElements.length > 0 });
      if (subElements && subElements.length) {
        this.prepareArray(element.children, subElements, isExpand);
      }
    }
  }

  bindTargetScoreList = (levelNumber: number) => {
    this.targetScoreList = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.targetScoreList.push(i);
    }
  };

  bindElementTargetData = (improvementPlan, isEdit = false) => {
    this.isElementTargetLoader = true;
    this.getImprovementPlanTarget(improvementPlan._id).subscribe(response => {
      const { initialAssessment, improvementPlan } = response.payload;
      const { elements, max_level, evaluation_level = 0 } = initialAssessment;
      this.bindTargetScoreList(evaluation_level);
      this.viewTargetMaxLevel = max_level;
      if (isEdit) {
        const { target_type, target } = improvementPlan;
        const { target_type: targetType } = this.addTargetForm.value;
        this.addTargetForm.patchValue({
          target_type: targetType !== '' ? targetType : target_type || 0,
          target: target_type === 0 ? target : ''
        })
        this.editTargetData = [];
      } else {
        this.viewTargetData = [];
      }
      this.prepareArray(isEdit ? this.editTargetData : this.viewTargetData, elements, isEdit ? true : false);
      this.isElementTargetLoader = false;
    }, error => {
      this.isElementTargetLoader = false;
    });
  }

  getImprovementPlanTarget = (planId): Observable<any> => {
    return this.assessmentImprovementPlanService.getImprovementPlanTarget(planId);
  }

  getFinalScore = (score) => {
    return retrieveScore(score);
  }

  onAddTarget = () => {
    if (this.isAddTargetAllowed) {
      this.isShowLayout = this.targetLayoutViewEnum.TARGET_ADDED;
    }
  };

  prepareAllElementList = (arr, arrList) => {
    for (const element of arrList) {
      const data = element;
      const { children } = element;
      if (children && children.length) {
        this.prepareAllElementList(arr, children);
      } else {
        arr.push(data.data);
      }
    }
  };

  onSaveTarget = () => {
    const targetData = [];
    this.prepareAllElementList(targetData, this.editTargetData);
    const params = {
      target_type: this.targetTypeControl.value
    };
    if (this.targetTypeControl.value === 0) {
      params['target'] = this.targetControl.value
    } else {
      const elements = targetData.map(el => ({ element_id: el.element_id, target: el.target })).filter(e => e.target)
      params['elements'] = elements
    }
    this.setImprovementPlanTarget(this.improvementPlan, params);
  };

  onCancelTarget = () => {
    if (this.improvementPlan.initial_assessment_id && this.improvementPlan.target) {
      this.isShowLayout = this.targetLayoutViewEnum.PREVIEW_TARGET;
    } else {
      this.isShowLayout = this.targetLayoutViewEnum.NO_TARGET_ADDED;
    }
  };

  setImprovementPlanTarget = (improvementPlan, params) => {
    this.assessmentImprovementPlanService.setImprovementPlanTarget(improvementPlan._id, params).subscribe(() => {
      this.onSetImprovementPlanTarget.emit({ isTargetSet: true })
      this.isShowLayout = this.targetLayoutViewEnum.PREVIEW_TARGET;
    })
  }

  onEditTarget = () => {
    this.bindElementTargetData(this.improvementPlan, true);
    this.isShowLayout = this.targetLayoutViewEnum.TARGET_ADDED;
  };

  inTargetScoreSelect = (event, rowNode) => {
    const { value } = event;
    rowNode.node.data.target = value && +value;
  }

  get formControls() {
    return this.addTargetForm.controls;
  }

  get targetTypeControl() {
    return this.formControls["target_type"];
  }
  get targetControl() {
    return this.formControls["target"];
  }

  onDeleteTarget = () => { };
}
