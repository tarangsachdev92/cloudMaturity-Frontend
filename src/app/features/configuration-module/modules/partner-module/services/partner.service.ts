import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class PartnerService {

  constructor(private _apiManager: APIManager) { }

  getPartnerList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.PARTNER, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createPartner = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.PARTNER, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updatePartner = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.PARTNER}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getPartner = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.PARTNER}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deletePartner = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.PARTNER}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
