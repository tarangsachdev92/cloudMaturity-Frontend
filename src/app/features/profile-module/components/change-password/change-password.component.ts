import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ValidationConstant, FormBaseComponent, CommonRegexp } from '@app/utility';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends FormBaseComponent implements OnInit {

  // Validations Constants
  validationMsg = new ValidationConstant();
  @Output() onChangePassword = new EventEmitter();

  // Form Group Variables
  changePasswordForm: FormGroup;

  constructor(_fb: FormBuilder) {
    super(_fb);
  }

  ngOnInit() {
    this.createChangePasswordForm();
  }

  createChangePasswordForm = () => {
    this.changePasswordForm = this._fb.group({
      oldPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)]
      ],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(CommonRegexp.PASSWORD_REGEXP),
        Validators.minLength(8),
        Validators.maxLength(50)]
      ],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.validate });
  };

  onSubmitChangePasswordForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (params.hasOwnProperty('confirmPassword')) {
        delete params['confirmPassword']
      }
      this.onChangePassword.emit(params)
    }
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.changePasswordForm.controls;
  }

  /**
   * Confirm Validation Check
   */
  validate(resetPasswordFormGroup: FormGroup) {
    const password = resetPasswordFormGroup.controls.newPassword;
    const repeatPassword = resetPasswordFormGroup.controls.confirmPassword;
    if (repeatPassword.value.length <= 0) {
      return null;
    }
    if (password.value.length === 0) {
      return null;
    }
    if (repeatPassword.value !== password.value) {
      repeatPassword.setErrors({ 'incorrect': true });
      return {
        doesMatchPassword: true
      };
    }
    return null;
  }

}
