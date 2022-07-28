import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi, ModelDetailEnum } from '@app/utility';

@Injectable()
export class AssessmentModelService {

    constructor(private apiManager: APIManager) { }

    getMaturitySchemaNames = (params = {}): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, AssessmentApi.MATURITY_LEVEL_SCHEMA_NAME, params,
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    getAssessmentModelElementList = (params = {}): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_MODEL_ELEMENTS_LIST}`,
            params, this.apiManager.Authorized_HttpOptions, false, true);
    }

    getModelElementList = (modelId, showLoader = false): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_ELEMENTS_LIST}`.replace('{modelId}', modelId), {},
            this.apiManager.Authorized_HttpOptions, false, showLoader);
    }

    getAssessmentModels = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODELS}`, params,
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    saveElement = (params = {}): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_ADD_ELEMENT}`,
            params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    saveSubElement = (params = {}): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_ADD_SUB_ELEMENT}`,
            params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelSelectedElementList = (id): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_SELECTED_MODEL_ELEMENTS_LIST}/${id}`,
            {}, this.apiManager.Authorized_HttpOptions, false, false);
    }

    getSubElements = (id, modelId): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_ALL_SUB_ELEMENTS}/${id}/${modelId}`,
            {}, this.apiManager.Authorized_HttpOptions, false, false);
    }

    createAssessmentModel = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, AssessmentApi.ASSESSMENT_MODEL_ADD, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    updateAssessmentModel = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.PUT, AssessmentApi.ASSESSMENT_MODEL_UPDATE, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelEligibleElementList = (id): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_ELIGIBLE_ELEMENTS_LIST}/${id}`,
            {}, this.apiManager.Authorized_HttpOptions, false, false);
    }


    getAssessmentModelElementDetail = (id, isLoading = true): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_DETAILS}/${id}`,
            {}, this.apiManager.Authorized_HttpOptions, false, isLoading);
    }

    addElementsToAssessmentModel = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_ADD_ELEMENTS_TO_MODEL}`,
            params, this.apiManager.Authorized_HttpOptions, true, true);
    }


    deleteSelectedElement = (modelId, elementId): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_MODEL_DELETE_ELEMENT_FROM_MODEL}/${modelId}/${elementId}`, {},
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteSelectedCriteria = (criteriaId): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_MODEL_DELETE_CRITERIA}/${criteriaId}`, {},
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    addElementsWeight = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_ADD_ELEMENTS_WEIGHT}`, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelList = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_LIST}`, params,
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    getAllAssessmentModelList = (showLoader = false): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL}`, {},
            this.apiManager.Authorized_HttpOptions, false, showLoader);
    }

    getCriteria = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA}`, params,
            this.apiManager.Authorized_HttpOptions, false, false);
    }

    saveCriteria = (params): Observable<any> => {
        const method: HttpMethodsTypeEnum = params.criteria_id
            ? HttpMethodsTypeEnum.PUT : HttpMethodsTypeEnum.POST;
        const url: string = params.criteria_id
            ? AssessmentApi.ASSESSMENT_MODEL_EDIT_CRITERIA : AssessmentApi.ASSESSMENT_MODEL_ADD_CRITERIA;
        return this.apiManager.httpHelperMethod(
            method, url, params, this.apiManager.Authorized_HttpOptions, true, true
        );
    }

    deleteCriteriaAttachment1 = (criteriaId, params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_MODEL_DELETE_CRITERIA_ATTACHMENT_1}`
                .replace('{criteriaId}', criteriaId), params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteAssessmentModel = (id): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_MODEL_DELETE}/${id}`, {},
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    cloneAssessmentModel = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_CLONE}`, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    cloneAssessmentModelElements = (params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_CLONE_MODEL_ELEMENTS}`, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelCriteria = (criteriaId, params = {}): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_DETAIL}/${criteriaId}`, params,
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    getAssessmentModelCriteriaRequirements = (criteriaId, params = {}): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_REQUIREMENT}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params, this.apiManager.Authorized_HttpOptions, false, true);
    }

    saveRequirement = (criteriaId, params, requirementId): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_REQUIREMENT}${requirementId ? `/${requirementId}` : ''}`
            .replace('{criteriaId}', criteriaId);
        const method = requirementId ? HttpMethodsTypeEnum.PUT : HttpMethodsTypeEnum.POST;
        return this.apiManager.httpHelperMethod(method, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteRequirement = (criteriaId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_REQUIREMENT_DELETE}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelCriteriaQuestions = (criteriaId, params = {}): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_QUESTION}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params, this.apiManager.Authorized_HttpOptions, false, true);
    }

    saveQuestion = (criteriaId, params, questionId): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_QUESTION}${questionId ? `/${questionId}` : ''}`
            .replace('{criteriaId}', criteriaId);
        const method = questionId ? HttpMethodsTypeEnum.PUT : HttpMethodsTypeEnum.POST;
        return this.apiManager.httpHelperMethod(method, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteQuestion = (criteriaId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_QUESTION_DELETE}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelCriteriaDocuments = (criteriaId, params = {}): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_DOCUMENT}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params, this.apiManager.Authorized_HttpOptions, false, true);
    }

    saveDocument = (criteriaId, params, documentId): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_DOCUMENT}${documentId ? `/${documentId}` : ''}`
            .replace('{criteriaId}', criteriaId);
        const method = documentId ? HttpMethodsTypeEnum.PUT : HttpMethodsTypeEnum.POST;
        return this.apiManager.httpHelperMethod(method, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteDocument = (criteriaId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_DOCUMENT_DELETE}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelCriteriaTasks = (criteriaId, params = {}): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_TASK}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params, this.apiManager.Authorized_HttpOptions, false, true);
    }

    saveTask = (criteriaId, taskId, params, fileArray = []): Observable<any> => {
        const method: HttpMethodsTypeEnum = taskId ? HttpMethodsTypeEnum.PUT_MULTIPART : HttpMethodsTypeEnum.POST_MULTIPART;
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_TASK}${taskId ? `/${taskId}` : ''}`
            .replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(method, url, params, this.apiManager.Authorized_HttpOptions,
            true, true, '',
            {}, fileArray);
    }

    deleteTask = (criteriaId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_TASK_DELETE}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params, this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteTaskAttachment = (taskId, documentId): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.DELETE, `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_TASK_DOCUMENT_DELETE}`
                .replace('{taskId}', taskId).replace('{documentId}', documentId), {},
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentModelCriteriaAttachments = (criteriaId, params = {}): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_CRITERIA_DETAIL_ATTACHMENT}`.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params, this.apiManager.Authorized_HttpOptions, false, true);
    }

    saveAttachment = (criteriaId, fileArray = []): Observable<any> => {
        const method: HttpMethodsTypeEnum = HttpMethodsTypeEnum.POST_MULTIPART;
        const url: string = AssessmentApi.ASSESSMENT_MODEL_CRITERIA_DETAIL_ATTACHMENT.replace('{criteriaId}', criteriaId);
        return this.apiManager.httpHelperMethod(method, url, {}, this.apiManager.Authorized_HttpOptions, true, true, '',
            {}, fileArray
        );
    }

    updateModelStatus = (modelId, params): Observable<any> => {
        const url: string = AssessmentApi.ASSESSMENT_MODEL_STATUS.replace('{modelId}', modelId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    deleteCriteriaAttachment2 = (criteriaId, params): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_MODEL_DELETE_CRITERIA_ATTACHMENT_2}`
                .replace('{criteriaId}', criteriaId), params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }



    getModelDocumentRequirements = (modelId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_DOCUMENT_REQUIREMENT_LIST}`
            .replace('{modelId}', modelId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params,
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    createModelDocumentRequirement = (modelId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_DOCUMENT_REQUIREMENT_LIST}`
            .replace('{modelId}', modelId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params,
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    updateModelDocumentRequirement = (modelId, documentRequirementId, params): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_DOCUMENT_REQUIREMENT_LIST}/${documentRequirementId}`
            .replace('{modelId}', modelId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.PUT, url, params,
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    getModelDocumentRequirement = (modelId, documentRequirementId): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_DOCUMENT_REQUIREMENT_LIST}/${documentRequirementId}`
            .replace('{modelId}', modelId);
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.GET, url, {},
            this.apiManager.Authorized_HttpOptions, false, true);
    }

    deleteModelDocumentRequirement = (modelId, documentRequirementId): Observable<any> => {
        const url = `${AssessmentApi.ASSESSMENT_MODEL_DOCUMENT_REQUIREMENT_LIST}/${documentRequirementId}`
            .replace('{modelId}', modelId);
        return this.apiManager.httpHelperMethod(HttpMethodsTypeEnum.DELETE, url, {},
            this.apiManager.Authorized_HttpOptions, true, true);
    }

    getAssessmentDashboardCriteria = (assessmentId, params = {}): Observable<any> => {
        return this.apiManager.httpHelperMethod(
            HttpMethodsTypeEnum.POST, `${AssessmentApi.ASSESSMENT_DASHBOARD_CRITERIA}`.replace('{assessmentId}', assessmentId),
            params, this.apiManager.Authorized_HttpOptions, false, true);
    }
}
