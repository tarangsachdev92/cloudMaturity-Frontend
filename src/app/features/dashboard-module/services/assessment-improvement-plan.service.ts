import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { AssessmentApi, HttpMethodsTypeEnum } from '@app/utility';
import { Observable } from 'rxjs';

@Injectable()
export class AssessmentImprovementPlanService {

  constructor(private _apiManager: APIManager) { }

  createImprovementPlan = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST,
      AssessmentApi.IMPROVEMENT_PLAN,
      params,
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  }

  getPlanAssessmentList = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.IMPROVEMENT_PLAN_ASSESSMENT_LIST}`
        .replace('{planId}', planId)
      ,
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  }

  getImprovementPlan = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.IMPROVEMENT_PLAN}/${planId}`,
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  }

  getImprovementPlanTarget = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      `${AssessmentApi.IMPROVEMENT_PLAN_TARGET}`
        .replace('{planId}', planId)
      ,
      {},
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  }

  setImprovementPlanTarget = (planId, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST,
      `${AssessmentApi.IMPROVEMENT_PLAN_TARGET}`
        .replace('{planId}', planId)
      ,
      params,
      this._apiManager.Authorized_HttpOptions,
      false,
      true
    );
  }

  getImprovementPlanGapAnalysis = (planId, isGapAnalysisLoader): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.IMPROVEMENT_PLAN_GAP_ANALYSIS}`.replace('{planId}', planId),
      {}, this._apiManager.Authorized_HttpOptions, false, isGapAnalysisLoader
    );
  }

  getImprovementPlanActionPlan = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.IMPROVEMENT_PLAN_ACTION_PLAN}`.replace('{planId}', planId),
      {}, this._apiManager.Authorized_HttpOptions, false, true
    );
  }

  generateImprovementPlanActionPlan = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.IMPROVEMENT_PLAN_ACTION_PLAN}`.replace('{planId}', planId),
      {}, this._apiManager.Authorized_HttpOptions, false, true
    );
  }

  updateImprovementAction = (params, planId, actionId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.IMPROVEMENT_PLAN_ACTION_PLAN_ACTION}/${actionId}`
        .replace('{planId}', planId),
      params, this._apiManager.Authorized_HttpOptions, true, true
    );
  }

  deleteImprovementPlanAction = (planId, actionId): Observable<any> => {
    return this._apiManager.httpHelperMethod(HttpMethodsTypeEnum.DELETE,
      `${AssessmentApi.IMPROVEMENT_PLAN_ACTION_PLAN_ACTION}/${actionId}`.replace('{planId}', planId),
      {}, this._apiManager.Authorized_HttpOptions, true, true
    );
  }

  generateImprovementPlanGap = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.IMPROVEMENT_PLAN_GAP_ANALYSIS}`.replace('{planId}', planId),
      {}, this._apiManager.Authorized_HttpOptions, false, true
    );
  }

  getImprovementPlanGapById = (planId, gapId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, `${AssessmentApi.IMPROVEMENT_PLAN_GAP_ANALYSIS}/${gapId}`.replace('{planId}', planId),
      {}, this._apiManager.Authorized_HttpOptions, false, true
    );
  }

  getImprovementPlanList = (params = {}): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.IMPROVEMENT_PLAN_LIST}`,
      params, this._apiManager.Authorized_HttpOptions, false, true
    );
  }

  deleteImprovementPlan = (id): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE,
      `${AssessmentApi.IMPROVEMENT_PLAN}/${id}`,
      {},
      this._apiManager.Authorized_HttpOptions,
      true,
      true
    );
  }

  saveImprovementPlanAction = (params, planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.IMPROVEMENT_PLAN_ACTION_PLAN_ACTION}`.replace('{planId}', planId), params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  getImprovementPlanReport = (planId): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET,
      AssessmentApi.IMPROVEMENT_PLAN_REPORT.replace("{planId}", planId),
      {},
      this._apiManager.Blob_HttpOptions,
      false,
      true
    );
  };
}
