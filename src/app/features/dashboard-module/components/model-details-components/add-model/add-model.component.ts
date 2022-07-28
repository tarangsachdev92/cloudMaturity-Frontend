import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentRouteConstants, CALCULATION_METHOD, CommonRegexp, FormBaseComponent, ValidationConstant } from '@app/utility';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AssessmentModelService } from '@app/features/dashboard-module/services';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent extends FormBaseComponent implements OnInit {

  savedModelData = {};
  isDataSaved = false;

  // Form Group Variables
  addAssessmentModelForm: FormGroup;

  // Validations Constants
  validationMsg = new ValidationConstant();

  // State Variables
  isLinear = false;
  calculationMethodsList = CALCULATION_METHOD;
  maturitySchemaList = [];

  id: string;
  isLoading = false;
  maturitySchemaSubscriber$: Subscription;
  formValueChangeSubscriber$: Subscription;

  constructor(
    public _fb: FormBuilder,
    private router: Router,
    private _assessmentModelService: AssessmentModelService,
    public location: Location
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.bindMaturitySchemaDropdown();
    this.createAssessmentModelForm();
    this.formValueChangeSubscriber();
  }

  bindMaturitySchemaDropdown = () => {
    this.maturitySchemaSubscriber$ = this.getMaturitySchema().subscribe(
      (response) => {
        this.maturitySchemaList = response.payload.data;
      }
    );
  };

  createAssessmentModelForm = () => {
    this.addAssessmentModelForm = this.createForm({
      model_name: ["",
        [
          Validators.required as any,
          Validators.pattern(
            CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP
          ) as any,
          Validators.minLength(2) as any,
          Validators.maxLength(40) as any,
        ],
      ],
      schema_id: ["",
        [Validators.required as any],
      ],
      max_level: [
        "",
        [Validators.required as any],
      ],
      description: [
        "",
        [Validators.minLength(2) as any, Validators.maxLength(500) as any],
      ],
      calculation_method: [
        "",
        [Validators.required as any],
      ],
    });
  };

  formValueChangeSubscriber = () => {
    this.formValueChangeSubscriber$ = this.addAssessmentModelForm.valueChanges.subscribe(
      (value) => {
        this.isDataSaved = false;
      }
    );
  };

  onSchemaSelectionChange = (event) => {
    const { schema_id } = this.addAssessmentModelForm.value;
    this.addAssessmentModelForm.patchValue({
      max_level: this.maturitySchemaList.filter(
        (elem) => elem._id === schema_id
      )[0].max_level,
    });
  };

  getMaturitySchema = (): Observable<any> => {
    return this._assessmentModelService.getMaturitySchemaNames();
  };

  onSubmitAssessmentModel = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this._assessmentModelService.createAssessmentModel(params).subscribe(
        (response) => {
          this.router.navigate(['/' + AssessmentRouteConstants.MODEL_LIST]);
        },
        (error) => { }
      );
    }
  };

  onBack = () => {
    this.location.back();
  }

  get formControls() {
    return this.addAssessmentModelForm.controls;
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
