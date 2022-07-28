import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class DocumentTypeService {

  constructor(private _apiManager: APIManager) { }

  getDocumentTypeList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.DOCUMENT_TYPE, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createDocumentType = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, AssessmentApi.DOCUMENT_TYPE, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  updateDocumentType = (params, documentTypeId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, `${AssessmentApi.DOCUMENT_TYPE}/${documentTypeId}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getDocumentType = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.DOCUMENT_TYPE}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  deleteDocumentType = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, `${AssessmentApi.DOCUMENT_TYPE}/${id}`, {},
      this._apiManager.Authorized_HttpOptions, true, true);
  }
}
