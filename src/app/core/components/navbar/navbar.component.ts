import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { SharedService } from "@app/core/services";
import {
  AssessmentRouteConstants,
  UserProfileModel,
  getInitials,
  RoleEnum,
} from "@app/utility";
import { Role } from "@app/utility/shared-model/role.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  // Angular Variables
  @Output() menuClick = new EventEmitter<boolean>();

  // State Variables
  isShowDropdown = false;
  isShowNotification = false;

  userDetailSub$: Subscription;
  userData: UserProfileModel;

  constructor(private _router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    this.userDetailSub$ = this._sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userData = this._sharedService.getUser();
      });
  }

  onViewProfile = () => {
    this._router.navigate(["/" + AssessmentRouteConstants.PROFILE]);
    this.isShowDropdown = false;
  };

  onLogOut = () => {
    this._sharedService.logout();
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_LOGIN}`]);
    this.isShowDropdown = false;
  };

  onShowDropdown = () => {
    this.isShowDropdown = true;
  };

  onProfileOpen = () => {
    this._router.navigate([`/${AssessmentRouteConstants.PROFILE}`]);
  };

  get nameInitials() {
    return getInitials(this.userData.fullName);
  }

  onNotificationClick = () => {
    this.isShowNotification = true;
  };

  onHideNotification = () => {
    this.isShowNotification = false;
  };

  onModelReferenceList = () => {
    this._router.navigate([`/${AssessmentRouteConstants.MODEL_REFERENCE_MODULE}`]);
  }

  onClickHelp = () => {
    // window.open('https://scoreup-help.s3-us-west-1.amazonaws.com/help.pdf', "_blank");
    this._router.navigate([`/${AssessmentRouteConstants.HELP}`]);
  }

  get companyUrl() {
    return "/" + AssessmentRouteConstants.COMPANY_LIST;
  }

  get usersUrl() {
    return "/" + AssessmentRouteConstants.USERS_LIST;
  }

  get addUsersUrl() {
    return "/" + AssessmentRouteConstants.ADD_USERS;
  }

  get organisationUrl() {
    return "/" + AssessmentRouteConstants.ORGANISATION_LIST;
  }

  get addModelUrl() {
    return "/" + AssessmentRouteConstants.ADD_ASSESSMENT_MODEL;
  }

  get partnerUrl() {
    return "/" + AssessmentRouteConstants.PARTNER_LIST;
  }

  get maturitySchemaUrl() {
    return "/" + AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_LIST;
  }

  get assessmentTypeUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_TYPE_LIST;
  }

  get assessmentScopeUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_SCOPE_LIST;
  }

  get createAssessmentUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_CREATE;
  }

  get listAssessmentUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_FILTER;
  }

  get listModelUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_MODEL_LIST;
  }

  get dashboardUrl() {
    return "/" + AssessmentRouteConstants.MODEL_LIST;
  }

  get configurationUrl() {
    return "/" + AssessmentRouteConstants.CONFIGURATION;
  }

  get isAdmin() {
    return this._sharedService.getUserRole() == Role.SYSTEM_ADMIN;
  }

  get isCompanyAdmin() {
    return this._sharedService.getUserRole() == Role.COMPANY_ADMIN;
  }

  get isCompanyUser() {
    return this._sharedService.getUserRole() == Role.COMPANY_USER;
  }

  get isSuperAdmin() {
    return this._sharedService.isSuperAdmin();
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
}
