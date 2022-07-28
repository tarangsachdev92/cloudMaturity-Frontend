import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormBaseComponent } from '@app/utility';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssessmentModelService } from '@app/features/dashboard-module/services';

@Component({
  selector: 'app-copy-elements-dialog',
  templateUrl: './copy-elements-dialog.component.html',
  styleUrls: ['./copy-elements-dialog.component.scss'],
})
export class CopyElementsDialogComponent extends FormBaseComponent
  implements OnInit {

  copyElementForm: FormGroup;

  modelList = [];
  modelElementList = [];
  modelId;

  constructor(_fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CopyElementsDialogComponent>,
    private _assessmentModelService: AssessmentModelService,
  ) {
    super(_fb);
  }

  ngOnInit() {
    if (this.data) {
      this.modelId = this.data.modelId;
    }
    this.bindAssessmentModel();
    this.initalize();
  }

  bindAssessmentModel = () => {
    this._assessmentModelService.getAllAssessmentModelList().subscribe(response => {
      this.modelList = response.payload.data || [];
    }, error => { });
  }

  initalize = () => {
    this.createCopyElementsForm();
  }

  onModelChange = (event) => {
    this.formControls.elements.reset([]);
    this.bindModelElements(event.value);
  }

  bindModelElements = modelId => {
    this._assessmentModelService.getModelElementList(modelId).subscribe(response => {
      this.modelElementList = response.payload.data;
    }, error => { });
  }

  createCopyElementsForm = () => {
    this.copyElementForm = this.createForm({
      model_id: ['', []],
      elements: [[], []],
    });
  }

  onSubmitCopyElementForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = JSON.parse(JSON.stringify(form.value));
      if (this.modelId) {
        params.model_id = this.modelId;
        this._assessmentModelService.cloneAssessmentModelElements(params).subscribe(response => {
          this.onCloseDialog(true);
        }, error => { });
      }
    }
  }

  onCloseDialog(submit): void {
    this.dialogRef.close({ submit });
  }

  get formControls() {
    return this.copyElementForm.controls;
  }
}
