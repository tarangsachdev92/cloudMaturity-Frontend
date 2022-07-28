import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentService, CommonService } from '@app/core';
import { AssessmentRouteConstants, FormBaseComponent, prepareOrganisationTreeData, ValidationConstant } from '@app/utility';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-model-assessment-details',
  templateUrl: './model-assessment-details.component.html',
  styleUrls: ['./model-assessment-details.component.scss']
})
export class ModelAssessmentDetailsComponent extends FormBaseComponent implements OnInit, OnChanges {

  // Angular Variables
  @Output() isShowAssessmentList = new EventEmitter<boolean>();
  @Input() modelId;
  @Input() modelDetail;
  @Input() assessmentTypes = [];

  // Form Group Variables
  addAssessmentForm: FormGroup;
  models = [];
  organisations = [];
  partners = [];
  levels = [];
  // Validation Constant
  validationMsg = new ValidationConstant();

  constructor(
    private _router: Router,
    private _commonService: CommonService,
    private _assessmentService: AssessmentService,
    _fb: FormBuilder
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.bindAssessmentRelatedData();
    this.createAssessmentForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modelDetail) {
      const change = changes.modelDetail;
      if (change.currentValue) {
        this.bindLevels(this.modelDetail.max_level)
      }
    }
  }

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  };

  nodes = [];

  bindAssessmentRelatedData = () => {
    this.getAssessmentRelatedData().subscribe((response) => {
      this.organisations = response[0].payload.data || [];
      this.nodes = prepareOrganisationTreeData(this.organisations);
      this.models = response[1].payload.data || [];
      this.partners = response[2].payload.data || [];
    });
  }

  getAssessmentRelatedData = () => {
    const observables = [
      this.getOrganisations(),
      this.getModels(),
      this.getPartners(),
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

  getPartners = (): Observable<any> => {
    return this._commonService.getPartners();
  }

  // @TARANG:
  // USE BELOW FUNCTION WHEN PARTNER IS REQUIRED
  isPartnerNameRequired = () => {
    this.formControls["partner_id"].setValidators(Validators.required);
  }

  createAssessmentForm = () => {
    this.addAssessmentForm = this.createForm({
      org_id: ["", [<any>Validators.required]],
      model_id: [this.modelId || "", [<any>Validators.required]],
      evaluation_level: ['', []],
      partner_id: ["", []],
      assessment_type_id: ["", [<any>Validators.required]],
    });
  }

  onSubmitCreateAssessmentForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this._assessmentService.createAssessment(params).subscribe(
        (response) => {
          const assessmentId = response.payload.data;
          const modelId = this.modelId
          this._router.navigate([
            `/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL}`.replace(':modelId', modelId,),
            assessmentId
          ]);
        },
        (error) => { }
      );
    }
  }

  onShowList = () => {
    this.isShowAssessmentList.emit();
  }

  get formControls() {
    return this.addAssessmentForm.controls;
  }

}
