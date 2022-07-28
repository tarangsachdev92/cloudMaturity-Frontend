import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormBaseComponent, ValidationConstant, CommonRegexp, ElementModel } from '@app/utility';

@Component({
  selector: 'app-sub-element-details-dialog',
  templateUrl: './sub-element-details-dialog.component.html',
  styleUrls: ['./sub-element-details-dialog.component.scss']
})
export class SubElementDetailsDialogComponent extends FormBaseComponent implements OnInit {

  // Angular variables
  @Output() subElementSave = new EventEmitter<any>();

  // Form Group Variables
  subElementFrom: FormGroup;
  subElements: FormArray;

  // Validation Constant
  validationMsg = new ValidationConstant();

  elementDetail: ElementModel;
  warningMessage: string;

  constructor(
    public dialogRef: MatDialogRef<SubElementDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _fb: FormBuilder
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.elementDetail = this.data ? this.data.element : null;
    this.warningMessage = this.data ? this.data.warningMessage : '';
    this.createSubElementForm(this.elementDetail);
  }

  createSubElementForm = (elementDetail: ElementModel) => {
    this.subElementFrom = this.createForm({
      elements: this._fb.array([this.createSubElement(elementDetail)])
    });
  }

  createSubElement(elementDetail): FormGroup {
    return this._fb.group({
      element_name: [elementDetail && elementDetail.element_name || '', [
        Validators.required as any,
        Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP) as any,
        Validators.minLength(2) as any,
        Validators.maxLength(10) as any,
      ]],
      description: [elementDetail && elementDetail.description || '', [
        Validators.minLength(2) as any,
        Validators.maxLength(500) as any
      ]]
    })
  }

  onSubmitSubElement = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.subElementSave.emit({ params: { ...form.value } });
    }
  }

  onAddSubElement = () => {
    this.subElements = this.subElementFrom.get('elements') as FormArray;
    this.subElements.push(this.createSubElement(this.elementDetail));
  }

  onRemoveSubElement = (index) => {
    const subElements = this.subElementFrom.get('elements') as FormArray;
    subElements.removeAt(index)
  }

  onCloseDialog(submit): void {
    this.dialogRef.close({ submit });
  }

  get formControls() {
    return this.subElementFrom.controls;
  }

  getSubElementsControls = () => {
    return (this.subElementFrom.get('elements') as FormArray).controls;
  }

  get title() {
    return `${this.elementDetail ? 'Edit' : 'Add'} Sub Domain`;
  }

}

