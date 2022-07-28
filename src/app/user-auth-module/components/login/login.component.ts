import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AssessmentRouteConstants,
  CommonRegexp,
  FormBaseComponent,
  ValidationConstant,
} from "@app/utility";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  // Angular Variables
  @Output() loginClick = new EventEmitter();
  test = "testsetestestestestsetestestestestestestestes";
  // FormGroup Variables
  loginForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();

  // State Variables
  hidePassword = true;

  constructor(_fb: FormBuilder, private _router: Router) {
    super(_fb);
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.createLoginForm();
  }

  // To initialize FormGroup
  createLoginForm = () => {
    this.loginForm = this.createForm({
      email: [
        "",
        [
          <any>Validators.required,
          <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP),
          <any>Validators.minLength(6),
          <any>Validators.maxLength(50),
        ],
      ],
      password: [
        "",
        [
          <any>Validators.required,
          <any>Validators.pattern(CommonRegexp.PASSWORD_REGEXP),
          <any>Validators.minLength(8),
          <any>Validators.maxLength(50),
        ],
      ],
    });
  };

  onHidePassword = () => {
    this.hidePassword = false;
  };

  onLoginFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      let params = { ...form.value };
      this.loginClick.emit(params);
    }
  };

  get email() {
    return this.formControls["email"];
  }

  onForgotPassword = () => {
    this._router.navigate([
      `/${AssessmentRouteConstants.AUTH_FORGOT_PASSWORD}`,
    ]);
  };

  onSignUp = () => {
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_SIGN_UP}`]);
  };
}
