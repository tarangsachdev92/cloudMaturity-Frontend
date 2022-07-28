import { Injectable } from "@angular/core";
import { AssessmentApi, HttpMethodsTypeEnum } from "@app/utility";
import { Observable } from "rxjs";
import { APIManager } from "./apimanager.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private _apiManager: APIManager) { }

  getCountries = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.COUNTRIES,
      {},
      this._apiManager.Content_Type_Json_HttpOptions,
      false,
      true
    );
  }

  getCompanyTypes = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.COMPANY_TYPES,
      {},
      this._apiManager.Content_Type_Json_HttpOptions,
      false,
      true
    );
  }

  getCompanySizeList = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.COMPANY_SIZES,
      {},
      this._apiManager.Content_Type_Json_HttpOptions,
      false,
      true
    );
  }

  getRoles = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.ROLES,
      {},
      this._apiManager.Content_Type_Json_HttpOptions,
      false,
      true
    );
  }

  getOrganisations = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.ORGANISATIONS,
      {},
      this._apiManager.Authorized_HttpOptions_JSON,
      false,
      true
    );
  }

  getModels = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.MODELS,
      {},
      this._apiManager.Authorized_HttpOptions_JSON,
      false,
      true
    );
  }
  getAssessmentTypes = (isLoader = true): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.ASSESSMENT_TYPES,
      {},
      this._apiManager.Authorized_HttpOptions_JSON,
      false,
      isLoader
    );
  }

  getPartners = (isLoader = true): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.PARTNERS,
      {},
      this._apiManager.Authorized_HttpOptions_JSON,
      false,
      isLoader
    );
  }

  getOrganisationListWithParentChildRelation = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.ORGANISATION_LIST,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  }

  getUserList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.USERS,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  }

  getAllUserList = (loader = false): Observable<any> => {
    return this._apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, AssessmentApi.ALL_USER_LIST, {},
      this._apiManager.Authorized_HttpOptions, false, loader
    );
  }

  getAssessmentScopeList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, AssessmentApi.ASSESSMENT_SCOPE,
      params, this._apiManager.Authorized_HttpOptions, false, true
    );
  }

  getFileUrl = (fileName): Observable<any> => {
    const params = { fileName };
    return this._apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, AssessmentApi.GET_URL, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  createAssessment = (params): Observable<any> => {
    const method: HttpMethodsTypeEnum = params.assessment_id
      ? HttpMethodsTypeEnum.PUT
      : HttpMethodsTypeEnum.POST;
    const url: string = params.assessment_id
      ? AssessmentApi.ASSESSMENT_EDIT
      : AssessmentApi.ASSESSMENT_ADD;
    return this._apiManager.httpHelperMethod(
      method,
      url,
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  }

  deleteAssessment = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE,
      `${AssessmentApi.ASSESSMENT_DELETE}/${id}`,
      {},
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  }
  getDocumentTypeList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.DOCUMENT_TYPE, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getAssessmentModels = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODELS}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getAssessmentReferenceModels = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_REFERENCE_MODELS}`, params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  cloneAssessmentModel = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_CLONE}`, params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }
  getAssessmentModelElementDetail = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_DETAILS}/${id}`,
      {}, this._apiManager.Authorized_HttpOptions, false, true);
  }

  getUserPersonalProfile = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.USER_PROFILE}`,
      {}, this._apiManager.Authorized_HttpOptions, false, true);
  }

  editUserPersonalProfile = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.USER_PROFILE}`,
      params, this._apiManager.Authorized_HttpOptions, true, true);
  }

  getUserCompanyProfile = (): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.COMPANY_PROFILE}`,
      {}, this._apiManager.Authorized_HttpOptions, false, true);
  }

  editUserCompanyProfile = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.COMPANY_PROFILE}`,
      params, this._apiManager.Authorized_HttpOptions, true, true);
  }
}
