import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { AssessmentApi, HttpMethodsTypeEnum } from '@app/utility';
import { Observable } from 'rxjs';

@Injectable()
export class ModelDocumentService {

  constructor(private apiManager: APIManager) { }

  getModelDocumentStaticsByOrganisation = (modelId, orgId): Observable<any> => {
    return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET,
      `${AssessmentApi.MODEL_DOCUMENT_BY_ORGANISATION}`.replace('{orgId}', orgId).replace('{modelId}', modelId),
      {}, this.apiManager.Authorized_HttpOptions, false, true
    );
  }

  importOrRefreshOrganisationModelDocuments = (modelId, params): Observable<any> => {
    return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST,
      `${AssessmentApi.ORGANISATION_MODEL_DOCUMENTS_IMPORT}`.replace('{modelId}', modelId),
      params, this.apiManager.Authorized_HttpOptions, true, true
    );
  }

  getOrganisationModelDocument = (orgId, params, isLoader = true): Observable<any> => {
    return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST,
      `${AssessmentApi.ORGANISATION_MODEL_DOCUMENTS}`.replace('{orgId}', orgId),
      params, this.apiManager.Authorized_HttpOptions, false, isLoader
    );
  }

  updateOrganisationDocumentRequirement = (orgId, documentId, params, fileArray = []): Observable<any> => {
    return this.apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT_MULTIPART, `${AssessmentApi.ORGANISATION_MODEL_DOCUMENTS}/${documentId}`.replace('{orgId}', orgId),
      params, this.apiManager.Authorized_HttpOptions, true, true, '',
      {}, fileArray
    );
  }

}
