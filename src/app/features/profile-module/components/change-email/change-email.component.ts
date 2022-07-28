import { Component, OnInit, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonRegexp, FormBaseComponent, ValidationConstant } from '@app/utility';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ProfileService } from '../../services';
import { Observable } from 'rxjs';
import { SharedService } from '@app/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends FormBaseComponent implements OnInit, OnChanges {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  @Output() onEmailChangeSuccess = new EventEmitter<boolean>();
  isLinear = false;

  isAnimationOn = true;
  changeEmailForm: FormGroup;
  email = '';
  password = '';
  currentPasswordForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();

  constructor(_fb: FormBuilder,
    private _sharedService: SharedService,
    private _profileService: ProfileService) {
    super(_fb);
  }

  ngOnInit() {
    this.stepper.selectedIndex = 0;
    this.createChangeEmailForm();
    this.createCurrentPasswordForm();
  }

  createChangeEmailForm = () => {
    this.changeEmailForm = this.createForm({
      email: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP),
        <any>Validators.minLength(6),
        <any>Validators.maxLength(50)
      ]]
    });
  };

  createCurrentPasswordForm = () => {
    this.currentPasswordForm = this.createForm({
      password: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.PASSWORD_REGEXP),
        <any>Validators.minLength(8),
        <any>Validators.maxLength(50)
      ]]
    });
  };

  onChangeEmailFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.email = form.value['email'];
      this.onNextStep(1);
    }
  };

  onCurrentPasswordFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.password = form.value.password;
      const params = { ...form.value }
      if (this.email) {
        params['newEmail'] = this.email;
        this.changeEmail(params)
      }
    }
  }

  changeEmail = (params) => {
    this._profileService.changeEmail(params).subscribe(response => {
      this.onNextStep(2);
    }, error => {
      this.currentPasswordForm.reset();
      this.onNextStep(0);
    });
  }

  onNextStep = (index) => {
    this.stepper.selectedIndex = index;
    this.isAnimationOn = true;
  };


  onVerifyOtp = (params = {}) => {
    params['newEmail'] = this.email;
    this.verifyOpt(params).subscribe(response => {
      const accessToken = response.payload.data.token;
      this._sharedService.setToken(accessToken);
      this.changeEmailForm.reset();
      this.currentPasswordForm.reset();
      this.onNextStep(0);
      this.onEmailChangeSuccess.emit(true);
    }, error => {
    });
  }

  resendOTPClick = (event) => {
    if (this.email) {
      this.resendOTP({ newEmail: this.email }).subscribe(response => {
      }, error => {
      })
    }
  }

  resendOTP = (params): Observable<any> => {
    return this._profileService.resendOtp(params);
  }

  verifyOpt = (params): Observable<any> => {
    return this._profileService.verifyOtp(params);
  }

  onBackClick = (event) => {
    this.onNextStep(1);
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.changeEmailForm.controls;
  }


  /**
   * convenience getter for easy access to form fields
   */
  get controls() {
    return this.currentPasswordForm.controls;
  }
  onAnimationFinish = () => {
    this.isAnimationOn = false;
  };
}
