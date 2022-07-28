import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentModelService } from '@app/features/dashboard-module/services';
import { AssessmentModelDataModel, CALCULATION_METHOD, FormBaseComponent, ValidationConstant } from '@app/utility';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent extends FormBaseComponent implements OnInit {

  // Angular variables
  @Input() modelData: AssessmentModelDataModel;
  @Output() modalSubmit = new EventEmitter();

  // Form Group Variables
  modelDetailForm: FormGroup;

  // Validations Constants
  validationMsg = new ValidationConstant();

  // Data related variables
  calculationMethodsList = CALCULATION_METHOD;
  maturitySchemaList = [];
  id: string;

  // Subscribe variables
  maturitySchemaSubscriber$: Subscription;
  formValueChangeSubscriber$: Subscription;

  constructor(_fb: FormBuilder, private _assessmentModelService: AssessmentModelService) {
    super(_fb);
  }

  ngOnInit() {
    this.bindMaturitySchemaDropdown();
    this.createAssessmentModelForm();
  }

  bindMaturitySchemaDropdown = () => {
    this.maturitySchemaSubscriber$ = this.getMaturitySchema().subscribe(
      (response) => {
        this.maturitySchemaList = response.payload.data;
      }
    );
  };

  createAssessmentModelForm = () => {
    this.modelDetailForm = this.createForm({
      schema_id: [
        (this.modelData && this.modelData.schema_id && this.modelData.schema_id._id) || "",
        [Validators.required as any],
      ],
      max_level: [
        (this.modelData && this.modelData.max_level) || "",
        [Validators.required as any],
      ],
      description: [
        (this.modelData && this.modelData.description) || "",
        [Validators.minLength(2) as any, Validators.maxLength(500) as any],
      ],
      calculation_method: [
        (this.modelData && this.modelData.calculation_method) || "",
        [Validators.required as any],
      ],
    });
  };

  onSchemaSelectionChange = (event) => {
    const { schema_id } = this.modelDetailForm.value;
    this.modelDetailForm.patchValue({
      max_level: this.maturitySchemaList.filter(
        (elem) => elem._id === schema_id
      )[0].max_level,
    });
  };

  onCancelEditModal = () => {
    this.modalSubmit.emit({ isSubmit: false });
  }

  getMaturitySchema = (): Observable<any> => {
    return this._assessmentModelService.getMaturitySchemaNames();
  };

  onSubmitAssessmentModel = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      params.model_id = this.modelData._id;
      this._assessmentModelService.updateAssessmentModel(params).subscribe(
        (response) => {
          const savedModelData = response.payload.data;
          this.modalSubmit.emit({ isSubmit: true, modelData: savedModelData });
        },
        (error) => { }
      );
    }
  };

  get formControls() {
    return this.modelDetailForm.controls;
  }

  ngOnDestroy() {
    if (this.maturitySchemaSubscriber$) {
      this.maturitySchemaSubscriber$.unsubscribe();
    }
    if (this.formValueChangeSubscriber$) {
      this.formValueChangeSubscriber$.unsubscribe();
    }
  }

}
