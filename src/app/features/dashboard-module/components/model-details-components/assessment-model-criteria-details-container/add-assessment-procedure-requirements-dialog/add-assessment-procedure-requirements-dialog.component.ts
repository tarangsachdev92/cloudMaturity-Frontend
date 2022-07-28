import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent, ValidationConstant } from '@app/utility';

@Component({
  selector: 'app-add-assessment-procedure-requirements-dialog',
  templateUrl: './add-assessment-procedure-requirements-dialog.component.html',
  styleUrls: ['./add-assessment-procedure-requirements-dialog.component.scss'],
})
export class AddAssessmentProcedureRequirementsDialogComponent extends FormBaseComponent implements OnInit {
  requirementForm: FormGroup;

  @Input() requirement;
  @Output() requirementAddUpdate = new EventEmitter<any>();
  validationMsg = new ValidationConstant();

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<AddAssessmentProcedureRequirementsDialogComponent>) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createRequirementsForm(this.requirement);
  }

  createRequirementsForm = (requirement) => {
    this.requirementForm = this.createForm({
      // unique_id: [requirement ? requirement.unique_id : '', [Validators.required as any]],
      description: [requirement ? requirement.description : '', [Validators.required as any]],
    });
  }

  onSubmitRequirementsForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this.requirementAddUpdate.emit({ params });
    }
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }

  get formControls() {
    return this.requirementForm.controls;
  }

  get title() {
    return `${this.requirement ? 'Edit' : 'Add'} Requirement`;
  }
}
