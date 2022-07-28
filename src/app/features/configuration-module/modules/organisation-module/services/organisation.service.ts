import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class OrganisationService {

  constructor(private _apiManager: APIManager) { }

  getOrganisationList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.ORGANISATION_LIST, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createOrganization = (params, isSubOrganisation = false): Observable<any> => {
    const url = isSubOrganisation ? AssessmentApi.SUB_ORGANISATION_ADD : AssessmentApi.ORGANISATION_ADD
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, url, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updateOrganization = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.ORGANISATION}`, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  getOrganisation = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.ORGANISATION}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deleteOrganisation = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ORGANISATION}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
