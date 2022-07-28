import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class AssessmentTypeService {

  constructor(private _apiManager: APIManager) { }

  getAssessmentTypeList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.ASSESSMENT_TYPE, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createAssessmentType = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.ASSESSMENT_TYPE, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updateAssessmentType = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.ASSESSMENT_TYPE}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getAssessmentType = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_TYPE}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deleteAssessmentType = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_TYPE}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
