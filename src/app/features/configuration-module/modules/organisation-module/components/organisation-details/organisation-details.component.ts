import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssessmentRouteConstants, FormBaseComponent, CommonRegexp, ValidationConstant, OrganisationModel } from '@app/utility';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../../services';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent extends FormBaseComponent implements OnInit, OnDestroy {

  // Form Group Variables
  organisationForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();

  id: number;
  private sub: any;
  isLoading = false;

  constructor(private _router: Router,
    private route: ActivatedRoute,
    private _organisationService: OrganisationService,
    _fb: FormBuilder) {
    super(_fb);
  }

  ngOnInit() {
    this.createOrganisationForm();
    this.routeSubscribe();
  }

  createOrganisationForm = () => {
    this.organisationForm = this.createForm({
      org_name: ['', [
        Validators.required as any,
        Validators.pattern(CommonRegexp.ALPHA_NUMERIC_REGEXP) as any,
        Validators.minLength(2) as any,
        Validators.maxLength(255) as any,
      ]],
      description: ['', [
        Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP) as any,
        Validators.minLength(2) as any,
        Validators.maxLength(200) as any
      ]]
    });
  }

  routeSubscribe = () => {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.isLoading = true;
        this.getOrganisation(this.id).subscribe(response => {
          const orgData = response.payload.data;
          this.patchUserForm(orgData);
          this.isLoading = false;
        }, error => {
          this.onOrganisationList();
        });
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  patchUserForm = (organisation: OrganisationModel) => {
    const { org_name, description } = organisation;
    this.organisationForm.patchValue({
      org_name, description
    });
  }

  getOrganisation = (id) => {
    return this._organisationService.getOrganisation(id);
  }

  onSubmitOrganisation = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (this.id) {
        params._id = this.id;
        this._organisationService.updateOrganization(params).subscribe(response => {
          this.onOrganisationList();
        }, error => { });
      } else {
        this._organisationService.createOrganization(params).subscribe(response => {
          this.onOrganisationList();
        }, error => { });
      }
    }
  }

  onOrganisationList = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ORGANISATION_LIST]);
  }

  get formControls() {
    return this.organisationForm.controls;
  }
  get title() {
    return `${this.id ? 'Edit' : 'Add'} Organisation`;
  }
  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
