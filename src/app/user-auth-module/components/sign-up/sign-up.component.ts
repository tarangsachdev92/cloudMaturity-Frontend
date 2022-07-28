import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AssessmentRouteConstants, FormBaseComponent, CommonRegexp, ValidationConstant } from '@app/utility';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent extends FormBaseComponent implements OnInit {

  // FormGroup Variables
  signUpForm: FormGroup;

  @Output() onSignUp = new EventEmitter();

  // Validation Constant
  validationMsg = new ValidationConstant();

  // State Variables
  hidePassword = true;

  constructor(_fb: FormBuilder,
    private _router: Router) {
    super(_fb);
  }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm = () => {
    this.signUpForm = this.createForm({
      email: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP),
        <any>Validators.minLength(6),
        <any>Validators.maxLength(50)
      ]],
      name: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_REGEXP),
        <any>Validators.minLength(2),
        <any>Validators.maxLength(40)
      ]],
      password: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.PASSWORD_REGEXP),
        <any>Validators.minLength(8),
        <any>Validators.maxLength(50)
      ]],
      company: ['', [
        <any>Validators.required,
        <any>Validators.minLength(2),
        <any>Validators.maxLength(50)
      ]],
      captcha: [null, [
        <any>Validators.required
      ]],
    });
  }

  onSignUpSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      let params = { ...form.value };
      this.formControls['captcha'].reset();
      this.onSignUp.emit(params);
    }
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.signUpForm.controls;
  }

  onLogin = () => {
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_LOGIN}`]);
  }
}
