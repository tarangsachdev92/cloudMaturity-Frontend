import { Injectable } from "@angular/core";
import { APIManager } from "./apimanager.service";
import { APPStorage, AssessmentApi, HttpMethodsTypeEnum } from "@app/utility";
import { Observable } from "rxjs";

@Injectable()
export class AssessmentService {
  private _elementId: string;
  private _filterObjeact: any;
  private _level: number;
  private _subElementIndex: number = 0;

  constructor(private _apiManager: APIManager) {}

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
  };

  createSurvey = (params): Observable<any> => {
    const method: HttpMethodsTypeEnum = params._id
      ? HttpMethodsTypeEnum.PUT
      : HttpMethodsTypeEnum.POST;
    const url: string = params._id
      ? AssessmentApi.ASSESSMENT_SURVEY_EDIT
      : AssessmentApi.ASSESSMENT_SURVEY_ADD;
    return this._apiManager.httpHelperMethod(
      method,
      url,
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  updateSurvey = (params, fileArray = []): Observable<any> => {
    const method = HttpMethodsTypeEnum.PUT_MULTIPART;
    const url: string = AssessmentApi.ASSESSMENT_EVALUATE;
    return this._apiManager.httpHelperMethod(
      method,
      url,
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true,
      "",
      {},
      fileArray
    );
  };

  updateCriteriaDetail = (
    criteriaId,
    assessmentId,
    params
  ): Observable<any> => {
    const url: string = `${AssessmentApi.ASSESSMENT_CRITERIA_DETAIL_UPDATE}`
      .replace("{assessmentId}", assessmentId)
      .replace("{criteriaId}", criteriaId);
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT,
      url,
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  deleteAssessmentSurvey = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE,
      `${AssessmentApi.ASSESSMENT_SURVEY_DELETE}/${id}`,
      {},
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  getAssessmentDetail = (assessmentId, params = {}): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.ASSESSMENT_DETAIL}/${assessmentId}`,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  getAssessmentSurveyList = (assessmentId, params = {}): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.ASSESSMENT_SURVEY_LIST}/${assessmentId}`,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  getAssessmentTeamList = (assessmentId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.ASSESSMENT_TEAM}`.replace(
        "{assessmentId}",
        assessmentId
      ),
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  getAssessmentDashboard = (assessmentId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.ASSESSMENT_DASHBOARD}`.replace(
        "{assessmentId}",
        assessmentId
      ),
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  getPartnerList = (assessmentId, params = {}): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.ASSESSMENT_SURVEY_LIST}/${assessmentId}`,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  getAssessmentList = (params = {}): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST,
      `${AssessmentApi.ASSESSMENT_LIST}`,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  deleteAssessment = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE,
      `${AssessmentApi.ASSESSMENT_DELETE}/${id}`,
      {},
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  deleteAssessmentAttachment = (
    attachmentId,
    criteriaId,
    assessmentId
  ): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE,
      `${AssessmentApi.ASSESSMENT_CRITERIA_ATTACHMENT_REMOVE}`
        .replace("{assessmentId}", assessmentId)
        .replace("{criteriaId}", criteriaId)
        .replace("{attachmentId}", attachmentId),
      {},
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  getSurveyElementCriteriaByLevel = (
    assessmentId,
    elementId,
    level
  ): Observable<any> => {
    const url = AssessmentApi.ASSESSMENT_ELEMENT_CRITERIA_BY_LEVEL.replace(
      "{assessmentId}",
      assessmentId
    )
      .replace("{elementId}", elementId)
      .replace("{level}", level);
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      url,
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  getSurveyElementCriteria = (assessmentId, elementId): Observable<any> => {
    const url = AssessmentApi.ASSESSMENT_ELEMENT_CRITERIA.replace(
      "{assessmentId}",
      assessmentId
    ).replace("{elementId}", elementId);
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      url,
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  updateAssessmentAuthority = (
    authorityType,
    assessmentId
  ): Observable<any> => {
    const url: string = `${AssessmentApi.ASSESSMENT_AUTHORITY}/${authorityType}`.replace(
      "{assessmentId}",
      assessmentId
    );
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT,
      url,
      {},
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  updateAssessmentPlan = (params, assessmentId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT,
      `${AssessmentApi.ASSESSMENT_PLAN}`.replace(
        "{assessmentId}",
        assessmentId
      ),
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  updateAssessmentTeam = (params, assessmentId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST,
      `${AssessmentApi.ASSESSMENT_TEAM}`.replace(
        "{assessmentId}",
        assessmentId
      ),
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  };

  deleteAssessmentTeamMember = (assessmentId, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST,
      `${AssessmentApi.ASSESSMENT_TEAM_MEMBER_REMOVE}`.replace(
        "{assessmentId}",
        assessmentId
      ),
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  getElementId() {
    return this._elementId;
  }

  setElementId(value: string): void {
    this._elementId = value;
  }

  getLevel() {
    return this._level;
  }

  setLevel(value: number): void {
    this._level = value;
  }

  getSubElementIndex() {
    return this._subElementIndex || 0;
  }

  setSubElementIndex(value: number): void {
    this._subElementIndex = value;
  }

  // getFilterObject() {
  //   return this._filterObjeact;
  // }

  // setFilterObject(value: any): void {
  //   this._filterObjeact = value;
  // }

  getFilterObject(): any {
    this._filterObjeact =
      localStorage.getItem(APPStorage.ASSESSMENT_FILTER) || {};
    let filterObj;
    try {
      filterObj = JSON.parse(this._filterObjeact);
    } catch (error) {
      filterObj = {};
    }
    return filterObj;
  }

  setFilterObject(value: any): void {
    this._filterObjeact = value;
    localStorage.setItem(APPStorage.ASSESSMENT_FILTER, JSON.stringify(value));
  }

  deleteFilterObject(): void {
    this._filterObjeact = null;
    localStorage.removeItem(APPStorage.ASSESSMENT_FILTER);
  }

  updateAssessment = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT,
      `${AssessmentApi.ASSESSMENT_UPDATE}`,
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  };

  getAssessmentReport = (assessmentId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.ASSESSMENT_REPORT.replace("{assessmentId}", assessmentId),
      {},
      this._apiManager.Blob_HttpOptions,
      false,
      true
    );
  };
}
