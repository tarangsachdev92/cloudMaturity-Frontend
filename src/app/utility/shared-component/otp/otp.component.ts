import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '../form-base/form-base.component';
import { ValidationConstant, CommonRegexp } from '../../shared-constants';

@Component({
  selector: 'app-utility-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent extends FormBaseComponent implements OnInit {

  otpForm: FormGroup;
  validationMsg = new ValidationConstant();

  @Input() email: string;
  @Output() backClick = new EventEmitter();
  @Output() resendClick = new EventEmitter();
  @Output() otpSubmit = new EventEmitter();

  // Data related variables
  clockDisplay: string;
  interval: any;
  duration: number;

  constructor(_fb: FormBuilder) {
    super(_fb);
  }

  ngOnInit() {
    this.createOtpForm();
    // this.email='tarangsachdev@gmail.com';
  }

  // To initialize FormGroup
  createOtpForm = () => {
    this.otpForm = this._fb.group({
      otp: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.NUMERIC_REGEXP),
        <any>Validators.minLength(6),
        <any>Validators.maxLength(6)
      ]]
    });
  };

  onOtpFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = form.value;
      this.otpSubmit.emit(params);
    }
  };

  onBackClick = () => {
    this.backClick.emit()
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.otpForm.controls;
  }

  resendOtp = () => {
    this.resendClick.emit(true);
  }
}
