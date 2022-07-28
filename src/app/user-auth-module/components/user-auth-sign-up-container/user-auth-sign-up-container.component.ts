import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { UserAuthService } from '@app/user-auth-module/services';
import { Observable } from 'rxjs';
import { AssessmentRouteConstants } from '@app/utility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth-sign-up-container',
  templateUrl: './user-auth-sign-up-container.component.html',
  styleUrls: ['./user-auth-sign-up-container.component.scss']
})
export class UserAuthSignContainerComponent implements OnInit {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  isLinear = false;
  isAnimationOn = true;
  // Data related variables
  signUpParams;

  constructor(private _userAuthService: UserAuthService, private _router: Router) {
  }

  ngOnInit() {
    this.stepper.selectedIndex = 0;
  }

  onSignUp = (params) => {
    this.signUpParams = params;
    this._userAuthService.singUp(params).subscribe(response => {
      this.onNextStep(1);
    }, error => {
    })
  }

  onVerifyOtp = (params = {}) => {
    params['email'] = this.signUpParams.email;
    this.verifyOpt(params).subscribe(response => {
      this.redirectToLogin();
    }, error => {
    });
  }

  resendSignUpOtpClick = (event) => {
    this.resendSignUpOtp(this.signUpParams).subscribe(response => {
    }, error => {
    })
  }

  redirectToLogin = () => {
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_LOGIN}`]);
  }

  resendSignUpOtp = (params): Observable<any> => {
    return this._userAuthService.resendSignOtp(params);
  }

  verifyOpt = (params): Observable<any> => {
    return this._userAuthService.signUpOtpVerify(params);
  }

  onBackClick = (event) => {
    this.onNextStep(0);
  }

  onNextStep = (index) => {
    this.stepper.selectedIndex = index;
    this.isAnimationOn = true;
  };

  onAnimationFinish = () => {
    this.isAnimationOn = false;
  };
}
