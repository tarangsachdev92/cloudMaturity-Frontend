import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormBaseComponent, ValidationConstant } from '@app/utility';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assessment-model-copy-dialog',
  templateUrl: './assessment-model-copy-dialog.component.html',
  styleUrls: ['./assessment-model-copy-dialog.component.scss'],
})
export class AssessmentModelCopyDialogComponent extends FormBaseComponent
  implements OnInit {
  assessmentModelCopyFrom: FormGroup;
  modelData;
  validationMsg = new ValidationConstant();
  @Output() modelSave = new EventEmitter<any>();

  constructor(
    _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssessmentModelCopyDialogComponent>
  ) {
    super(_fb);
  }

  ngOnInit() {
    if (this.data) {
      this.modelData = this.data.assessmentModel;
    }
    this.initialize();
  }

  initialize = () => {
    this.createAssessmentModelCopyForm();
  }

  createAssessmentModelCopyForm = () => {
    this.assessmentModelCopyFrom = this.createForm({
      model_name: ['', Validators.required as any]
    });
  }

  onSubmitAssessmentModelCopyFrom = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.modelSave.emit({ params: { ...form.value } });
    }
  }

  onCloseDialog(submit): void {
    this.dialogRef.close({ submit });
  }

  get formControls() {
    return this.assessmentModelCopyFrom.controls;
  }
}
