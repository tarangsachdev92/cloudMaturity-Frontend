import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable()
export class AssessmentQuestionnaireService {

  constructor(private _apiManager: APIManager) { }

  getQuestionnaireCriteria = (assessmentId, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_QUESTIONNAIRE_CRITERIA}`
        .replace('{assessmentId}', assessmentId), params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  getQuestionsList = (assessmentId, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_QUESTIONNAIRE_LIST}`
        .replace('{assessmentId}', assessmentId), params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  assignQuestion = (assessmentId, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_ASSIGN_QUESTION}`
        .replace('{assessmentId}', assessmentId), params,
      this._apiManager.Authorized_HttpOptions, false, true);
  }

  answerQuestion = (assessmentId, questionId, params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_ANSWER_QUESTION}`
        .replace('{assessmentId}', assessmentId).replace('{questionId}', questionId), params,
      this._apiManager.Authorized_HttpOptions, true, true);
  }

  // getModelElementList = (modelId, loader = false): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_ELEMENTS_LIST}`.replace('{modelId}', modelId), {},
  //     this._apiManager.Authorized_HttpOptions, false, loader);
  // }

  // getSubElementList = (parentElementId, loader = false): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_ELEMENT_SUB_ELEMENTS}`.replace('{parentElementId}', parentElementId), {},
  //     this._apiManager.Authorized_HttpOptions, false, loader);
  // }

  // createElement = (params): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.POST, AssessmentApi.ASSESSMENT_MODEL_ADD_ELEMENT, params,
  //     this._apiManager.Authorized_HttpOptions, true, true);
  // }

  // updateElement = (elementId: string, params): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.PUT, `${AssessmentApi.ASSESSMENT_MODEL_ELEMENT}/${elementId}`, params,
  //     this._apiManager.Authorized_HttpOptions, true, true);
  // }

  // createSubElement = (params): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.POST, AssessmentApi.ASSESSMENT_MODEL_ADD_SUB_ELEMENT, params,
  //     this._apiManager.Authorized_HttpOptions, true, true);
  // }

  // getElement = (id): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.GET, `${AssessmentApi.ELEMENT}/${id}`, {},
  //     this._apiManager.Authorized_HttpOptions, false, true);
  // }

  // deleteAssessmentModelElementSubElement = (modelId, params): Observable<any> => {
  //   return this._apiManager.httpHelperMethod(
  //     HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_MODEL_ELEMENTS_DELETE}`.replace('{modelId}', modelId), params,
  //     this._apiManager.Authorized_HttpOptions, true, true);
  // }
}
