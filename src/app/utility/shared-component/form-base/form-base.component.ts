import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-base',
  template: ''
})

export class FormBaseComponent implements OnChanges {

  @Input() canFocusField: boolean;
  @ViewChild('initialFormField', { static: true }) initialFormField;

  submitted = false;

  constructor(protected _fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialFormField && this.canFocusField) {
      this.initialFormField.nativeElement.focus();
    }
  }

  /**
   *
   */
  protected createForm(controlsConfig, extraConfig = {}): FormGroup {
    const form = this._fb.group(controlsConfig, extraConfig);
    return form;
  };

  protected onSubmit(form) {
    this.submitted = true;
    if (form.invalid) {
      return false;
    }
    return true;
  }

  /**
   * @param formControlName(Required Field)
   */
  isRequiredField = (formControlName) => {
    return formControlName.touched && formControlName.hasError('required');
  };

  /**
   * @param formControlName(Valid field)
   */
  isValidField = (formControlName) => {
    return formControlName.touched && formControlName.hasError('pattern');
  };

  isInvalidDateField = (formControlName) => {
    return formControlName.touched && formControlName.invalid;
  };

  getDatePickerErrors = (ctrl) => {
    if (Object.keys(ctrl.errors).length === 1) {
      return Object.keys(ctrl.errors)[0];
    } else {
      return Object.keys(ctrl.errors)[2];
    }
  };

  /**
   * @param formControlName(Valid Length)
   */
  isValidLength = (formControlName) => {
    return formControlName.touched && (formControlName.hasError('minlength') || formControlName.hasError('maxlength'));
  };

  /**
   * @param errorName
   * @param formGroup
   * @param formControl
   * @param submitted
   * Custom Validation method
   */
  hasError = (errorName, formGroup, formControl, submitted) => {
    return submitted && formGroup.hasError(errorName) && formControl.dirty;
  };
}
