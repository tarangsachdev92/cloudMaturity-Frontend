import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationConstant, FormBaseComponent, CommonRegexp } from '@app/utility';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent extends FormBaseComponent implements OnInit {

  resetPasswordForm: FormGroup;
  validationMsg = new ValidationConstant();

  hide = true;
  hideResetPassword = true;

  @Output() onResetPassword = new EventEmitter();

  constructor(_fb: FormBuilder) {
    super(_fb);
  }

  ngOnInit() {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm = () => {
    this.resetPasswordForm = this._fb.group({
      password: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.PASSWORD_REGEXP),
        <any>Validators.minLength(8),
        <any>Validators.maxLength(50)
      ]],
      confirmPassword: ['', [
        <any>Validators.required,
      ]],
    }, { validator: this.validate });
  };

  onResetPasswordFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (params.confirmPassword) {
        delete params.confirmPassword
      }
      this.onResetPassword.emit(params)
    }
  };

  onHidePassword = () => {
    this.hide = false;
    this.hideResetPassword = false;
  };

  /**
   * Confirm Validation Check
   */
  validate(resetPasswordFormGroup: FormGroup) {
    const password = resetPasswordFormGroup.controls.password;
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

  onCancelClick = () => {
    this.onResetPassword.emit(null);
  };

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.resetPasswordForm.controls;
  }

}
