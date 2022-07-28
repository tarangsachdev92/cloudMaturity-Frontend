import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class MaturityLevelSchemaService {

  constructor(private _apiManager: APIManager) { }

  getMaturityLevelSchemaList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.MATURITY_LEVEL_SCHEMA, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createMaturityLevelSchema = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.MATURITY_LEVEL_SCHEMA, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updateMaturityLevelSchema = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.MATURITY_LEVEL_SCHEMA}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getMaturityLevelSchema = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.MATURITY_LEVEL_SCHEMA}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deleteMaturityLevelSchema = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.MATURITY_LEVEL_SCHEMA}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
