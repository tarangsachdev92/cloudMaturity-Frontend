import { Component, OnInit } from "@angular/core";
import { CommonService, SharedService } from "@app/core";
import { CompanyModel, ProfileViewEnum, UserProfileModel } from "@app/utility";
import { forkJoin } from "rxjs";
import { ProfileService } from "../../services";

@Component({
  selector: "app-profile-container",
  templateUrl: "./profile-container.component.html",
  styleUrls: ["./profile-container.component.scss"],
})
export class ProfileContainerComponent implements OnInit {
  // Enum for change view
  profileViewEnum = ProfileViewEnum;
  isShowView = this.profileViewEnum.PERSONAL_DATA;
  userDetail: UserProfileModel;
  companyDetail: CompanyModel;

  constructor(
    private profileService: ProfileService,
    private commonService: CommonService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.bindProfileData();
  }

  onProfileViewChange = (view: ProfileViewEnum) => {
    this.isShowView = view;
  };


  handleUserPersonalProfileResponse = (response) => {
    this.userDetail = response.payload.data;
    this.sharedService.setUser(this.userDetail);
  }

  handleUserCompanyProfileResponse = (response) => {
    this.companyDetail = response.payload.company;
  }

  onEditPersonalProfile = (event) => {
    if (event) {
      const { params } = event;
      this.commonService.editUserPersonalProfile(params).subscribe(
        (response) => {
          this.bindUserPersonalProfile();
        },
        (error) => { }
      );
    }
  };

  onEditCompanyProfile = (event) => {
    if (event) {
      const { params } = event;
      this.commonService.editUserCompanyProfile(params).subscribe(
        (response) => {
          this.bindUserCompanyProfile();
        },
        (error) => { }
      );
    }
  };

  bindProfileData = () => {
    const observables = [
      this.getUserPersonalProfile(),
      this.getUserCompanyProfile(),
    ];
    forkJoin(observables).subscribe(response => {
      this.handleUserPersonalProfileResponse(response[0]);
      this.handleUserCompanyProfileResponse(response[1]);
    })
  }

  bindUserPersonalProfile = () => {
    this.getUserPersonalProfile().subscribe(
      (response) => {
        this.handleUserPersonalProfileResponse(response);
      },
      (error) => { }
    );
  };

  bindUserCompanyProfile = () => {
    this.getUserCompanyProfile().subscribe(
      (response) => {
        this.handleUserCompanyProfileResponse(response);
      },
      (error) => { }
    );
  };

  onChangePasswordClick = (event) => {
    if (event) {
      const params = { ...event };
      this.changePassword(params).subscribe(
        (response) => {
          this.onProfileViewChange(this.profileViewEnum.PERSONAL_DATA);
        },
        (error) => { }
      );
    }
  };

  changePassword = (params) => {
    return this.profileService.changePassword(params);
  };

  onEmailChangeSuccess = (event) => {
    if (event) {
      this.bindProfileData();
    }
  };

  getUserPersonalProfile = () => {
    return this.commonService.getUserPersonalProfile();
  };

  getUserCompanyProfile = () => {
    return this.commonService.getUserCompanyProfile();
  };

  get isOwner() {
    return this.userDetail && this.userDetail.isCompany
  }
}
