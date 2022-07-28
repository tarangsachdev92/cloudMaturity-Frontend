import { Component, OnInit, ViewChild } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { UserAuthService } from "@app/user-auth-module/services";
import { Router } from "@angular/router";
import { AssessmentRouteConstants } from "@app/utility";
import { CommonService, SharedService } from "@app/core";
import { ProfileService } from "@app/features/profile-module/services";

@Component({
  selector: "app-user-auth-login-container",
  templateUrl: "./user-auth-login-container.component.html",
  styleUrls: ["./user-auth-login-container.component.scss"]
})
export class UserAuthLoginContainerComponent implements OnInit {
  @ViewChild("stepper", { static: true }) stepper: MatStepper;

  isLinear = false;
  isAnimationOn = true;

  // Data related variables
  resendApiParams = null;

  constructor(
    private _router: Router,
    private _sharedService: SharedService,
    private commonService: CommonService,
    private _profileService: ProfileService,
    private _userAuthService: UserAuthService
  ) { }

  ngOnInit() {
    // localStorage.clear();
    this.stepper.selectedIndex = 0;
  }

  getResendApiParams = value => {
    this.resendApiParams = value;
  };

  onNextStep = index => {
    this.stepper.selectedIndex = index;
    this.isAnimationOn = true;
  };

  onLoginSubmit = params => {
    if (params) {
      this._userAuthService.signIn(params).subscribe(
        response => {
          this.handleLoginResponse(response);
        },
        error => {
          // this.checkCaptcha();
        }
      );
    }
  };

  handleLoginResponse = response => {
    this._userAuthService.handleAuthResponse(response);
    this.commonService.getUserPersonalProfile().subscribe(response => {
      const userDetail = response.payload.data;
      this._sharedService.setUser(userDetail);
      this._sharedService.setLoginRequired(true);
      this._router.navigate(["/" + AssessmentRouteConstants.MODEL_LIST]);
    }, () => {
      this._sharedService.logout();
    }
    );
  };

  onAnimationFinish = () => {
    this.isAnimationOn = false;
  };
}
