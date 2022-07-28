import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class UserManagementService {

  constructor(private _apiManager: APIManager) { }

  getUserList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.USERS, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createUser = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.USER_ADD, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updateUser = (id, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.USER}/${id}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getUser = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.USER}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deleteUser = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.USER}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  enableDisableUser = (id, status): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.USER_ENABLE_DISABLE}/${id}/${status}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }

}
