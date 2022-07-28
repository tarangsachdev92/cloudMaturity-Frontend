import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _apiManager: APIManager) { }

  getCompanyProfile = (params = {}): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.COMPANY_PROFILE, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  updateProfile = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, AssessmentApi.COMPANY_PROFILE, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  changeEmail = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, AssessmentApi.CHANGE_EMAIL, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  resendOtp = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, AssessmentApi.RESEND_OTP_CHANGE_EMAIL, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  verifyOtp = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, AssessmentApi.VERIFY_OTP_CHANGE_EMAIL, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  changePassword = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, AssessmentApi.CHANGE_PASSWORD, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }
  deleteAccount = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.DELETE_ACCOUNT}`, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
