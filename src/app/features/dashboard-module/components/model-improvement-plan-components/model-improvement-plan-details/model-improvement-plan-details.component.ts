import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@app/core';
import { AssessmentImprovementPlanService } from '@app/features/dashboard-module/services';
import { AssessmentRouteConstants, FormBaseComponent, prepareOrganisationTreeData, ValidationConstant } from '@app/utility';
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: 'app-model-improvement-plan-details',
  templateUrl: './model-improvement-plan-details.component.html',
  styleUrls: ['./model-improvement-plan-details.component.scss']
})
export class ModelImprovementPlanDetailsComponent extends FormBaseComponent implements OnInit {

  // Angular variables
  @Output() isShowImprovementPlanList = new EventEmitter<boolean>();
  @Input() modelId;

  // Form Group Variables
  addImprovementPlanForm: FormGroup;
  models = [];
  nodes = [];
  organisations = [];

  // Validation Constant
  validationMsg = new ValidationConstant();

  constructor(_fb: FormBuilder, private router: Router,
    private assessmentImprovementPlanService: AssessmentImprovementPlanService,
    private _commonService: CommonService) {
    super(_fb);
  }

  ngOnInit() {
    this.bindAssessmentPlanRelatedData();
    this.createImprovementPlanForm();
  }

  bindAssessmentPlanRelatedData = () => {
    this.getAssessmentPlanRelatedData().subscribe((response) => {
      this.organisations = response[0].payload.data || [];
      this.nodes = prepareOrganisationTreeData(this.organisations);
      this.models = response[1].payload.data || [];
    });
  }

  getAssessmentPlanRelatedData = () => {
    const observables = [
      this.getOrganisations(),
      this.getModels(),
    ];
    return forkJoin(observables);
  }

  getOrganisations = (): Observable<any> => {
    // TODO remove page:1 as a required field from the api
    const params = { page: 1, recordsPerPage: 999999 };
    return this._commonService.getOrganisationListWithParentChildRelation(params);
  }

  getModels = (): Observable<any> => {
    return this._commonService.getModels();
  }
  createImprovementPlanForm = () => {
    this.addImprovementPlanForm = this.createForm({
      org_id: ["", [<any>Validators.required]],
      model_id: [this.modelId || "", [<any>Validators.required]],
      valid_from: ["", [<any>Validators.required]],
      valid_to: ["", [<any>Validators.required]],
    });
  };

  onSubmitImprovementPlanForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this.assessmentImprovementPlanService.createImprovementPlan(params).subscribe(
        (response) => {
          const assessmentPlanId = response.payload.improvementPlan._id;
          this.router.navigateByUrl(`${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLAN_DETAILS}/${assessmentPlanId}`
            .replace(':modelId', this.modelId));
        },
        (error) => { }
      );
    }
  };

  onShowList = () => {
    this.isShowImprovementPlanList.emit();
  }

  get formControls() {
    return this.addImprovementPlanForm.controls;
  }

}
