import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonRegexp, FormBaseComponent, ValidationConstant, AssessmentRouteConstants } from '@app/utility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends FormBaseComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  validationMsg = new ValidationConstant();

  @Output() submitEmail = new EventEmitter();

  constructor(_fb: FormBuilder, private _router: Router) {
    super(_fb);
  }

  ngOnInit() {
    this.createForgotPasswordForm();
  }

  // To initialize FormGroup
  createForgotPasswordForm = () => {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP),
        <any>Validators.minLength(6),
        <any>Validators.maxLength(50)
      ]],
    });
  };

  onForgotPasswordFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this.submitEmail.emit(params);
    }
  };

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  onBackToLogin = () => {
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_LOGIN}`]);    
  };

}
