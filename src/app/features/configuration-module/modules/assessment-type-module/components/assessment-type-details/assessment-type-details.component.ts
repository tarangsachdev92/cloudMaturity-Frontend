import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentRouteConstants, ValidationConstant, FormBaseComponent, CommonRegexp, AssessmentTypeModel } from '@app/utility';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssessmentTypeService } from '../../services';

@Component({
  selector: 'app-assessment-type-details',
  templateUrl: './assessment-type-details.component.html',
  styleUrls: ['./assessment-type-details.component.scss']
})
export class AssessmentTypeDetailsComponent extends FormBaseComponent implements OnInit, OnDestroy {

  // Form Group Variables
  assessmentTypeForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();
  private sub: any;
  id: number;
  isLoading = false;

  constructor(_fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _assessmentTypeService: AssessmentTypeService,
    private _router: Router) {
    super(_fb);
  }

  ngOnInit() {
    this.createAssessmentTypeForm();
    this.routeSubscribe();
  }

  createAssessmentTypeForm = () => {
    this.assessmentTypeForm = this.createForm({
      name: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP),
        <any>Validators.minLength(2),
        <any>Validators.maxLength(40),
      ]],
      description: ['', [
        <any>Validators.minLength(2),
        <any>Validators.maxLength(500)
      ]]
    });
  };

  routeSubscribe = () => {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.isLoading = true;
        this.getAssessmentType(this.id).subscribe(response => {
          const userData = response['payload']['data'];
          this.patchAssessmentTypeForm(userData);
          this.isLoading = false;
        }, error => {
          this.onAssessmentTypeList();
        })
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  patchAssessmentTypeForm = (assessmentTypeData) => {
    const { name, description } = assessmentTypeData;
    this.assessmentTypeForm.patchValue({
      name, description
    })
  }

  getAssessmentType = (id) => {
    return this._assessmentTypeService.getAssessmentType(id);
  }

  onSubmitAssessmentTypeForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value }
      if (this.id) {
        params['_id'] = this.id;
        this._assessmentTypeService.updateAssessmentType(params).subscribe(response => {
          this.onAssessmentTypeList();
        }, error => { })
      }
      else {
        this._assessmentTypeService.createAssessmentType(params).subscribe(response => {
          this.onAssessmentTypeList();
        }, error => { })
      }
    }
  };

  onAssessmentTypeList = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ASSESSMENT_TYPE_LIST]);
  };

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.assessmentTypeForm.controls;
  }

  get title() {
    return `${this.id ? 'Edit' : 'Add'} Assessment Type`
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
