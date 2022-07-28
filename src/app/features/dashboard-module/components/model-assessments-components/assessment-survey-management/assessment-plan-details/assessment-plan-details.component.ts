import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AssessmentService, CommonService } from "@app/core";
import {
  assessmentAuthorities,
  AssessmentRouteConstants,
  formatDecimal,
  FormBaseComponent,
} from "@app/utility";
import { TreeNode } from "primeng/api";

@Component({
  selector: "app-assessment-plan-details",
  templateUrl: "./assessment-plan-details.component.html",
  styleUrls: ["./assessment-plan-details.component.scss"],
})
export class AssessmentPlanDetailsComponent
  extends FormBaseComponent
  implements OnInit, OnChanges {
  @Input() elementList = [];
  @Input() assessmentTeamList = [];
  @Input() assessmentDetail;
  @Input() isLoadingResults: boolean;
  @Output() authorityUpdate = new EventEmitter<any>();
  @Output() planUpdate = new EventEmitter<any>();
  allUserList = [];
  isUserLoading = false;
  isVisibleAssessmentTeam = false;
  assessmentAuthorityForm: FormGroup;

  authorities = assessmentAuthorities;
  data: TreeNode[] = [];
  date = new FormControl(new Date());

  activeRowId = "";
  elementsToBeUpdated = {};

  constructor(
    public _fb: FormBuilder,
    private assessmentService: AssessmentService,
    private commonService: CommonService,
    private router: Router
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.bindAllUser();
    this.createFormAssessmentAuthorityForm();
    if (this.elementList && this.elementList.length) {
      this.bindTreeData(this.elementList);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.assessmentDetail) {
      const assessmentDetailChange = changes.assessmentDetail;
      if (
        !assessmentDetailChange.firstChange &&
        assessmentDetailChange.currentValue
      ) {
        this.patchAssessmentAuthorityForm(this.assessmentDetail);
      }
    }
    if (changes.elementList) {
      const elementListChange = changes.elementList;
      if (!elementListChange.firstChange && elementListChange.currentValue) {
        this.bindTreeData(elementListChange.currentValue);
      }
    }
  }

  bindAllUser = () => {
    this.isUserLoading = true;
    this.commonService.getAllUserList(false).subscribe(
      (response) => {
        this.allUserList = response.payload.users.users;
        this.isUserLoading = false;
      },
      (error) => {
        this.isUserLoading = false;
      }
    );
  };

  createFormAssessmentAuthorityForm = () => {
    this.assessmentAuthorityForm = this.createForm({
      authority: ["", []],
    });
  };

  patchAssessmentAuthorityForm = (assessmentDetail) => {
    this.assessmentAuthorityForm = this.createForm({
      authority: [assessmentDetail ? assessmentDetail.authorityType : "", []],
    });
  };

  bindTreeData = (elementList) => {
    this.data = [];
    this.prepareArray(this.data, elementList);
    setTimeout(() => {
      if (localStorage.getItem("highlightedRow")) {
        const element = document.getElementById(
          localStorage.getItem("highlightedRow")
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: 'center'
          });
        }
      }
      this.activeRowId = localStorage.getItem("highlightedRow");
      localStorage.removeItem("highlightedRow");
    }, 150);
  };

  prepareArray = (arr, arrList) => {
    for (const element of arrList) {
      const data = element;
      element.children = [];
      const subElements = element.subElements;
      data.haveChild = subElements.length > 0;
      // arr.push({ data, children: element.children, expanded: data.haveChild });
      arr.push({ data, children: element.children });
      if (subElements && subElements.length) {
        this.prepareArray(element.children, subElements);
      }
    }
  };

  onAuthorityChange = (event) => {
    this.authorityUpdate.emit({ authority: event.value });
  };

  onShowAssessmentTeam = () => {
    this.isVisibleAssessmentTeam = true;
  };

  onHideAssessmentTeam = () => {
    this.isVisibleAssessmentTeam = false;
  };

  onClickRow = (rowData) => {
    localStorage.setItem("highlightedRow", rowData._id);
    this.router.navigateByUrl(
      `/${AssessmentRouteConstants.MODEL_ASSESSMENT_PLAN_DETAIL}/${rowData.element_id}`
        .replace(':modelId', rowData.model_id)
        .replace(':assessmentId', rowData.assessment_id)
    );
  };

  onWhoChange = (event, rowNode) => {
    const { element_id } = rowNode.node.data;
    if (!this.elementsToBeUpdated[element_id]) {
      this.elementsToBeUpdated[element_id] = { element_id }
    }
    this.elementsToBeUpdated[element_id].who = event;
  };

  onDueDateChange = (event, rowNode) => {
    const { element_id } = rowNode.node.data;
    if (!this.elementsToBeUpdated[element_id]) {
      this.elementsToBeUpdated[element_id] = { element_id }
    }
    this.elementsToBeUpdated[element_id].dueDate = event;
  };

  onChangeNote = (event, rowNode) => {
    const { element_id } = rowNode.node.data;
    if (!this.elementsToBeUpdated[element_id]) {
      this.elementsToBeUpdated[element_id] = { element_id }
    }
    this.elementsToBeUpdated[element_id].note = event.target.value;
  };

  onChangeRelevant = (event, rowNode) => {
    const { element_id } = rowNode.node.data;
    if (!this.elementsToBeUpdated[element_id]) {
      this.elementsToBeUpdated[element_id] = { element_id }
    }
    this.elementsToBeUpdated[element_id].relevant = event.checked;
  }

  onClickSave = () => {
    if (Object.keys(this.elementsToBeUpdated).length) {
      const params = {
        elements: Object.values(this.elementsToBeUpdated)
      };
      this.updateAssessmentPlan(params, this.assessmentDetail._id).subscribe(
        (response) => {
          this.elementsToBeUpdated = {};
          this.planUpdate.emit(true);
        }, (error) => { }
      );
    }
  }

  updateAssessmentPlan = (params, assessmentId) => {
    return this.assessmentService.updateAssessmentPlan(params, assessmentId);
  };

  getCurrentScore = (element) => {
    let currentScore = 0;
    if (element && element.score && typeof element.score === "number") {
      currentScore = +element.score;
    }
    return formatDecimal(currentScore);
  };

  get maxLevel() {
    return this.assessmentDetail && this.assessmentDetail.max_level
      ? this.assessmentDetail.max_level
      : 0;
  }

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
}
