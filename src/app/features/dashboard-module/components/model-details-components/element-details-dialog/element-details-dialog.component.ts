import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  FormBaseComponent,
  ValidationConstant,
  CommonRegexp,
  ElementModel,
} from '@app/utility';

@Component({
  selector: 'app-element-details-dialog',
  templateUrl: './element-details-dialog.component.html',
  styleUrls: ['./element-details-dialog.component.scss'],
})
export class ElementDetailsDialogComponent extends FormBaseComponent
  implements OnInit {

  // Angular variables
  @Output() elementSave = new EventEmitter<any>();

  // Validation Constant
  validationMsg = new ValidationConstant();

  // Form Group Variables
  elementFrom: FormGroup;
  elementDetail: ElementModel;
  elements: FormArray;

  constructor(
    public dialogRef: MatDialogRef<ElementDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _fb: FormBuilder
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.elementDetail = this.data ? this.data.element : null;
    this.createElementForm();
  }

  createElementForm = () => {
    this.elementFrom = this.createForm({
      elements: this._fb.array([this.createElement()])
    });
  }

  createElement(): FormGroup {
    return this._fb.group({
      element_name: [
        (this.elementDetail && this.elementDetail.element_name) || '',
        [
          Validators.required as any,
          Validators.pattern(
            CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP
          ) as any,
          Validators.minLength(2) as any,
          Validators.maxLength(10) as any,
        ],
      ],
      description: [
        (this.elementDetail && this.elementDetail.description) || '',
        [Validators.minLength(2) as any, Validators.maxLength(500) as any],
      ],
    });
  }

  onAddElement = () => {
    this.elements = this.elementFrom.get('elements') as FormArray;
    this.elements.push(this.createElement());
  }

  onRemoveElement = (index) => {
    const elements = this.elementFrom.get('elements') as FormArray;
    elements.removeAt(index)
  }

  onSubmitElement = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.elementSave.emit({ params: { ...form.value } });
    }
  }

  onCloseDialog(submit): void {
    this.dialogRef.close({ submit });
  }

  get formControls() {
    return this.elementFrom.controls;
  }

  getElementsControls = () => {
    return (this.elementFrom.get('elements') as FormArray).controls;
  }

  get title() {
    return `${this.elementDetail ? 'Edit' : 'Add'} Domain`;
  }
}
