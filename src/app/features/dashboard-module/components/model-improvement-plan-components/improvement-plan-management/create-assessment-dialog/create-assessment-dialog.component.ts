import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonService } from "@app/core";
import { AssessmentModelDataModel, FormBaseComponent, ValidationConstant } from "@app/utility";
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: "app-create-assessment-dialog",
  templateUrl: "./create-assessment-dialog.component.html",
  styleUrls: ["./create-assessment-dialog.component.scss"],
})
export class CreateAssessmentDialogComponent
  extends FormBaseComponent
  implements OnInit {
  @Input() improvementPlan;
  @Input() modelData: AssessmentModelDataModel;
  @Output() addAssessment = new EventEmitter<any>();

  // Form Group variables
  assessmentCreateForm: FormGroup;
  assessmentTypes = [];
  partners = [];
  levels = [];
  // Validations Constants
  validationMsg = new ValidationConstant();

  constructor(
    fb: FormBuilder,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<CreateAssessmentDialogComponent>
  ) {
    super(fb);
  }

  ngOnInit() {
    this.initialize(this.improvementPlan);
    this.bindLevels(this.modelData.max_level);
  }

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  };

  bindAssessmentRelatedData = () => {
    this.getAssessmentRelatedData().subscribe((response) => {
      this.partners = response[0].payload.data || [];
      this.assessmentTypes = response[1].payload.data || [];
    });
  }

  getAssessmentRelatedData = () => {
    const observables = [
      this.getPartners(),
      this.getAssessmentTypes(),
    ];
    return forkJoin(observables);
  }

  initialize = (improvementPlan) => {
    this.createActionPlanForm(improvementPlan);
    this.bindAssessmentRelatedData()
  };

  createActionPlanForm = (improvementPlan) => {
    this.assessmentCreateForm = this.createForm({
      org_id: [improvementPlan && improvementPlan.org_id && improvementPlan.org_id.org_name, [<any>Validators.required]],
      model_id: [improvementPlan && improvementPlan.model_id && improvementPlan.model_id.model_name, [<any>Validators.required]],
      assessment_type_id: ["", [<any>Validators.required]],
      evaluation_level: ["", []],
      partner_id: ["", []],
    });
  };

  getPartners = (): Observable<any> => {
    return this.commonService.getPartners(false);
  }

  getAssessmentTypes = (): Observable<any> => {
    return this.commonService.getAssessmentTypes(false);
  }

  onSubmitAssessmentForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      params.org_id = this.improvementPlan && this.improvementPlan.org_id && this.improvementPlan.org_id._id
      params.model_id = this.improvementPlan && this.improvementPlan.model_id && this.improvementPlan.model_id._id
      this.addAssessment.emit({ params });
    }
  };

  onCloseDialog = () => {
    this.dialogRef.close();
  };

  get formControls() {
    return this.assessmentCreateForm.controls;
  }
}
