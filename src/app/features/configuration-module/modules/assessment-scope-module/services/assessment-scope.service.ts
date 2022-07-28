import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class AssessmentScopeService {

  constructor(private _apiManager: APIManager) { }

  getAssessmentScopeList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.ASSESSMENT_SCOPE, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createAssessmentScope = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.ASSESSMENT_SCOPE, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updateAssessmentScope = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.ASSESSMENT_SCOPE}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getAssessmentScope = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_SCOPE}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deleteAssessmentScope = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_SCOPE}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
