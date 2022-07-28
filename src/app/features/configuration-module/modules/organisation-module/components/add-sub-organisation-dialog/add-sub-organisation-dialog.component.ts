import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationConstant, FormBaseComponent, CommonRegexp, OrganisationModel } from '@app/utility';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationService } from '../../services';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-add-sub-organisation-dialog',
  templateUrl: './add-sub-organisation-dialog.component.html',
  styleUrls: ['./add-sub-organisation-dialog.component.scss']
})
export class AddSubOrganisationDialogComponent extends FormBaseComponent implements OnInit, OnDestroy {

  // Validation Constant
  validationMsg = new ValidationConstant();
  parentOrganisation: OrganisationModel;
  organisation: OrganisationModel;
  // Form Group Variables
  subOrganisationForm: FormGroup;

  private addSubOrganisationSubscription: Subscription;
  private updateSubOrganisationSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddSubOrganisationDialogComponent>,
    private _organisationService: OrganisationService,
    @Inject(MAT_DIALOG_DATA) public data: any, public _fb: FormBuilder
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.parentOrganisation = this.data.parentOrganisation;
    this.organisation = this.data.organisation;
    this.createElmentForm();
  }

  createElmentForm = () => {
    this.subOrganisationForm = this.createForm({
      org_name: [(this.organisation && this.organisation.org_name) || '', [
        Validators.required as any,
        Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP) as any,
        Validators.minLength(2) as any,
        Validators.maxLength(40) as any,
      ]],
      description: [(this.organisation && this.organisation.description), [
        Validators.minLength(2) as any,
        Validators.maxLength(500) as any
      ]],
      parent_org_id: [this.parentOrganisation._id]
    });
  }

  onSubmitElement = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (this.organisation && this.organisation._id) {
        params._id = this.organisation._id;
        this.updateSubOrganisationSubscription = this.updateSubOrganisatoin(params).subscribe(response => {
          this.onCloseDialog(true);
        }, error => {
        });
      } else {
        this.addSubOrganisationSubscription = this.addSubOrganisation(params).subscribe(response => {
          this.onCloseDialog(true);
        }, error => {
        });
      }
    }
  }

  addSubOrganisation = (params): Observable<any> => {
    return this._organisationService.createOrganization(params, true);
  }

  updateSubOrganisatoin = (params): Observable<any> => {
    return this._organisationService.updateOrganization(params);
  }

  onCloseDialog(submit = true): void {
    const closeDialogData = { submit };
    this.dialogRef.close(closeDialogData);
  }

  get formControls() {
    return this.subOrganisationForm.controls;
  }

  get title() {
    return `${this.organisation ? 'Edit' : 'Add'} Sub Organisation`;
  }

  ngOnDestroy() {
    if (this.addSubOrganisationSubscription) { this.addSubOrganisationSubscription.unsubscribe(); }
    if (this.updateSubOrganisationSubscription) { this.updateSubOrganisationSubscription.unsubscribe(); }
  }
}
