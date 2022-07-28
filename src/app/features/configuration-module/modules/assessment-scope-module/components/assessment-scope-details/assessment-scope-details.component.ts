import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AssessmentRouteConstants,
  FormBaseComponent,
  ValidationConstant,
  CommonRegexp,
  AssessmentScopeModel
} from "@app/utility";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AssessmentScopeService } from "../../services";

@Component({
  selector: "app-assessment-scope-details",
  templateUrl: "./assessment-scope-details.component.html",
  styleUrls: ["./assessment-scope-details.component.scss"]
})
export class AssessmentScopeDetailsComponent extends FormBaseComponent
  implements OnInit, OnDestroy {
  // Form Group Variables
  assessmentScopeForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();

  private sub: any;
  id: number;
  isLoading = false;

  constructor(
    _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _assessmentScopeService: AssessmentScopeService,
    private _router: Router
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.createAssessmentScopeForm();
    this.routeSubscribe();
  }

  createAssessmentScopeForm = () => {
    this.assessmentScopeForm = this.createForm({
      name: [
        "",
        [
          <any>Validators.required,
          <any>(
            Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP)
          ),
          <any>Validators.minLength(2),
          <any>Validators.maxLength(40)
        ]
      ],
      description: [
        "",
        [<any>Validators.minLength(2), <any>Validators.maxLength(500)]
      ]
    });
  };

  routeSubscribe = () => {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      if (this.id) {
        this.isLoading = true;
        this.getAssessmentScope(this.id).subscribe(
          response => {
            const userData = response["payload"]["data"];
            this.patchAssessmentScopeForm(userData);
            this.isLoading = false;
          },
          error => {
            this.onAssessmentScopeList();
          }
        );
      }
      // In a real app: dispatch action to load the details here.
    });
  };

  patchAssessmentScopeForm = (assessmentTypeData: AssessmentScopeModel) => {
    const { name, description } = assessmentTypeData;
    this.assessmentScopeForm.patchValue({
      name,
      description
    });
  };

  getAssessmentScope = id => {
    return this._assessmentScopeService.getAssessmentScope(id);
  };

  onSubmitAssessmentScopeForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (this.id) {
        params["_id"] = this.id;
        this._assessmentScopeService.updateAssessmentScope(params).subscribe(
          response => {
            this.onAssessmentScopeList();
          },
          error => { }
        );
      } else {
        this._assessmentScopeService.createAssessmentScope(params).subscribe(
          response => {
            this.onAssessmentScopeList();
          },
          error => { }
        );
      }
    }
  };

  onAssessmentScopeList = () => {
    this._router.navigate([
      "/" + AssessmentRouteConstants.ASSESSMENT_SCOPE_LIST
    ]);
  };

  get formControls() {
    return this.assessmentScopeForm.controls;
  }

  get title() {
    return `${this.id ? "Edit" : "Add"} Assessment Scope`;
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
