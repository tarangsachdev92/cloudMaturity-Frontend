import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi, APPStorage, EncryptionFunctions } from '@app/utility';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIManager, SharedUserService, SharedService } from '@app/core';

@Injectable()
export class UserAuthService {
  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _apiManager: APIManager,
    private _sharedService: SharedService,
    private _sharedUserService: SharedUserService) {
  }

  singUp = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.SIGN_UP, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  signUpOtpVerify = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.OTP_VERIFY_SIGN_UP, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  signIn = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.LOGIN, params,
      this._apiManager.Content_Type_Json_HttpOptions, false, true,
      'Login Successfull!!');
  };


  forgotPassoword = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.FORGOT_PASSWORD, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  forgotOtpVerify = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.OTP_VERIFY_FORGOT_PASSWORD, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  resendForgotPasswordOtp = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.RESENT_OTP_SING_UP, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  resendSignOtp = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.RESENT_OTP_REGISTER, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  resetPassword = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.RESET_PASSWORD, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }

  handleAuthResponse = (response) => {
    const accessToken = response.payload.data.token;
    this._sharedService.setToken(accessToken);
    // this._sharedService.setLoginRequired(true);
  };
}
