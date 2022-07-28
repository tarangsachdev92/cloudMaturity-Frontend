import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { UserAuthService } from '@app/user-auth-module/services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';

@Component({
  selector: 'app-user-auth-forgot-container',
  templateUrl: './user-auth-forgot-container.component.html',
  styleUrls: ['./user-auth-forgot-container.component.scss']
})
export class UserAuthForgotContainerComponent implements OnInit {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  isLinear = false;
  isAnimationOn = true;
  email = ''

  // Data related variables
  resendApiParams = null;

  constructor(private _userAuthService: UserAuthService,
    private _router: Router) {

  }

  ngOnInit() {
    this.stepper.selectedIndex = 0;
  }

  getResendApiParams = (value) => {
    this.resendApiParams = value;
  };

  onSubmitEmail = (params) => {
    this.email = params.email;
    if (params) {
      this.forgotPassword(params).subscribe(response => {
        this.onNextStep(1);
      }, error => {
      })
    }
  }

  onVerifyOtp = (params = {}) => {
    params['email'] = this.email;
    this.verifyOpt(params).subscribe(response => {
      this.onNextStep(2);
    }, error => {
    });
  }

  onResetPasswordSubmit = (params) => {
    if (params) {
      params['email'] = this.email
      this.resetPassword(params).subscribe(response => {
        this.redirectToLogin();
      }, error => {
        this.redirectToLogin();
      });
    } else {
      this.redirectToLogin();
    }
  }

  resendForgotPasswordOtpClick = (event) => {
    this.resendForgotPasswordOtp({ email: this.email }).subscribe(response => {
    }, error => {
    })
  }

  redirectToLogin = () => {
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_LOGIN}`]);
  }

  resendForgotPasswordOtp = (params): Observable<any> => {
    return this._userAuthService.resendForgotPasswordOtp(params);
  }

  verifyOpt = (params): Observable<any> => {
    return this._userAuthService.forgotOtpVerify(params);
  }

  forgotPassword = (params) => {
    return this._userAuthService.forgotPassoword(params);
  }

  resetPassword = (params) => {
    return this._userAuthService.resetPassword(params);
  }

  onSignUp = (event) => {
    this.onNextStep(1);
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
