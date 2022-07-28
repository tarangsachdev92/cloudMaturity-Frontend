import { environment } from "@env/environment";

const BASE_URL = `${environment.apiUrl}/api`;
const PUBLIC_URL = `${environment.apiUrl}/public/api`;

export class AssessmentApi {
  public static LOGIN = BASE_URL + "/company/loginV1";
  public static SIGN_UP = BASE_URL + "/company/register";
  public static FORGOT_PASSWORD = BASE_URL + "/company/forgotPassword";
  public static OTP_VERIFY_SIGN_UP = BASE_URL + "/company/registerVerifyOtp";
  public static OTP_VERIFY_FORGOT_PASSWORD =
    BASE_URL + "/company/forgotPasswordVerifyOtp";
  public static RESET_PASSWORD = BASE_URL + "/company/resetPassword";
  public static RESENT_OTP_SING_UP =
    BASE_URL + "/company/resendOtpForgotPassword";
  public static RESENT_OTP_REGISTER = BASE_URL + "/company/resendOtpRegister";

  // Profile
  public static COMPANY_PROFILE = BASE_URL + "/company/profile";
  public static CHANGE_EMAIL = BASE_URL + "/company/changeEmail";
  public static VERIFY_OTP_CHANGE_EMAIL =
    BASE_URL + "/company/verifyOtpForChangeEmail";
  public static RESEND_OTP_CHANGE_EMAIL =
    BASE_URL + "/company/resendOtpEmailChange";
  public static CHANGE_PASSWORD = BASE_URL + "/company/changePassword";
  public static DELETE_ACCOUNT = `${BASE_URL}/company`;
  // public static LOGOUT = BASE_URL + '/identity/logout';
  public static USER_PROFILE = `${BASE_URL}/profile`;

  // Admin
  public static COMPANY = BASE_URL + "/admin/companies";
  public static COMPANY_APPROVED_REJECT = BASE_URL + "/admin/approveCompany";

  // Public Apis
  public static COUNTRIES = `${PUBLIC_URL}/getCountries`;
  public static COMPANY_TYPES = `${PUBLIC_URL}/getCompanyTypes`;
  public static COMPANY_SIZES = `${PUBLIC_URL}/getCompanySizes`;
  public static ROLES = `${PUBLIC_URL}/getRoles`;

  // Common Apis
  public static ORGANISATIONS = `${BASE_URL}/assessment/organizations`;
  public static MODELS = `${BASE_URL}/assessment/models`;
  public static ASSESSMENT_TYPES = `${BASE_URL}/assessment/assessmentTypes`;
  public static PARTNERS = `${BASE_URL}/assessment/partners`;
  public static GET_URL = `${BASE_URL}/utils/getURL`;

  // Users
  public static USERS = `${BASE_URL}/user/users`;
  public static ALL_USER_LIST = `${BASE_URL}/user/list`;
  public static USER_ADD = `${BASE_URL}/user/add`;
  public static USER = `${BASE_URL}/user`;
  public static USER_ENABLE_DISABLE = `${BASE_URL}/user/enableDisable`;

  // Organisation
  public static ORGANISATION_LIST = `${BASE_URL}/organization/list`;
  public static ORGANISATION = `${BASE_URL}/organization`;
  public static ORGANISATION_ADD = `${BASE_URL}/organization/add`;
  public static SUB_ORGANISATION_ADD = `${BASE_URL}/organization/addSubOrg`;

  // Partner
  public static PARTNER = `${BASE_URL}/partner`;

  // Assessment Type
  public static ASSESSMENT_TYPE = `${BASE_URL}/assessmentType`;

  // Assessment Type
  public static DOCUMENT_TYPE = `${BASE_URL}/documentType`;

  // Assessment Scope
  public static ASSESSMENT_SCOPE = `${BASE_URL}/assessmentScope`;

  // Maturity Level Schema
  public static MATURITY_LEVEL_SCHEMA = `${BASE_URL}/maturity`;
  public static MATURITY_LEVEL_SCHEMA_NAME = `${BASE_URL}/maturity/schemaNames`;

  // Element
  public static ELEMENT = `${BASE_URL}/element`;
  public static ELEMENT_ADD = `${BASE_URL}/element/addElement`;
  public static ELEMENT_LIST = `${BASE_URL}/element/list`;
  public static SUB_ELEMENT_ADD = `${BASE_URL}/element/addSubElement`;
  public static SUB_ELEMENT_LIST = `${BASE_URL}/element/subElements`;

  // Assessment model
  public static ASSESSMENT_MODEL = `${BASE_URL}/assessmentModel`;
  public static ASSESSMENT_MODEL_ELEMENTS_LIST = `${BASE_URL}/assessmentModel/{modelId}/elements`;
  public static ASSESSMENT_MODEL_ELEMENTS_DELETE = `${BASE_URL}/assessmentModel/{modelId}/elements`;
  public static ASSESSMENT_MODEL_ADD = `${BASE_URL}/assessmentModel/step1`;
  public static ASSESSMENT_MODEL_UPDATE = `${BASE_URL}/assessmentModel/editStep1`;
  public static ASSESSMENT_MODEL_SELECTED_MODEL_ELEMENTS_LIST = `${BASE_URL}/assessmentModel/getSelectedModelElements`;
  public static ASSESSMENT_MODEL_SUB_ELEMENTS = `${BASE_URL}/assessmentModel/getSubElements`;
  public static ASSESSMENT_MODEL_MODEL_ELEMENTS_LIST = `${BASE_URL}/assessmentModel/modelElementsList`;
  public static ASSESSMENT_MODEL_ELIGIBLE_ELEMENTS_LIST = `${BASE_URL}/assessmentModel/modelElements`;
  public static ASSESSMENT_MODEL_ADD_ELEMENTS_TO_MODEL = `${BASE_URL}/assessmentModel/step2`;
  public static ASSESSMENT_MODEL_DELETE_ELEMENT_FROM_MODEL = `${BASE_URL}/assessmentModel/deleteSelectedElement`;
  public static ASSESSMENT_MODEL_ADD_ELEMENTS_WEIGHT = `${BASE_URL}/assessmentModel/addElementsWeight`;
  public static ASSESSMENT_MODEL_LIST = `${BASE_URL}/assessmentModel/listModels`;
  public static ASSESSMENT_MODELS = `${BASE_URL}/assessmentModel/models`;
  public static ASSESSMENT_REFERENCE_MODELS = `${BASE_URL}/assessmentModel/referenceModels`;
  public static ASSESSMENT_MODEL_DELETE = `${BASE_URL}/assessmentModel/deleteModel`;
  public static ASSESSMENT_MODEL_DETAILS = `${BASE_URL}/assessmentModel/getAssessmentModel`;
  public static ASSESSMENT_MODEL_CRITERIA = `${BASE_URL}/assessmentModel/listCriteria`;
  public static ASSESSMENT_MODEL_ADD_CRITERIA = `${BASE_URL}/assessmentModel/addCriteria`;
  public static ASSESSMENT_MODEL_EDIT_CRITERIA = `${BASE_URL}/assessmentModel/editCriteria`;
  public static ASSESSMENT_MODEL_DELETE_CRITERIA = `${BASE_URL}/assessmentModel/deleteCriteria`;
  public static ASSESSMENT_MODEL_ADD_ELEMENT = `${BASE_URL}/assessmentModel/addElement`;
  public static ASSESSMENT_MODEL_ELEMENT = `${BASE_URL}/assessmentModel/element`;
  public static ASSESSMENT_MODEL_ADD_SUB_ELEMENT = `${BASE_URL}/assessmentModel/addSubElement`;
  public static ASSESSMENT_MODEL_ELEMENT_SUB_ELEMENTS = `${BASE_URL}/assessmentModel/element/{parentElementId}/subElements`;
  public static ASSESSMENT_MODEL_CLONE = `${BASE_URL}/assessmentModel/clone`;
  public static ASSESSMENT_MODEL_CLONE_MODEL_ELEMENTS = `${BASE_URL}/assessmentModel/cloneModelElements`;
  public static ASSESSMENT_MODEL_DELETE_CRITERIA_ATTACHMENT_1 = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/attachments`;
  public static ASSESSMENT_MODEL_CRITERIA_DETAIL = `${BASE_URL}/assessmentModel/criteria`;
  public static ASSESSMENT_MODEL_CRITERIA_REQUIREMENT = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/requirement`;
  public static ASSESSMENT_MODEL_CRITERIA_REQUIREMENT_DELETE = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/requirement/delete`;
  public static ASSESSMENT_MODEL_CRITERIA_QUESTION = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/question`;
  public static ASSESSMENT_MODEL_CRITERIA_QUESTION_DELETE = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/question/delete`;
  public static ASSESSMENT_MODEL_CRITERIA_DOCUMENT = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/document`;
  public static ASSESSMENT_MODEL_CRITERIA_DOCUMENT_DELETE = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/document/delete`;
  public static ASSESSMENT_MODEL_CRITERIA_TASK = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/task`;
  public static ASSESSMENT_MODEL_CRITERIA_TASK_DELETE = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/task/delete`;
  public static ASSESSMENT_MODEL_CRITERIA_TASK_DOCUMENT_DELETE = `${BASE_URL}/assessmentModel/task/{taskId}/document/{documentId}`;
  public static ASSESSMENT_MODEL_CRITERIA_DETAIL_ATTACHMENT = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/attachment`;
  public static ASSESSMENT_MODEL_DELETE_CRITERIA_ATTACHMENT_2 = `${BASE_URL}/assessmentModel/criteria/{criteriaId}/attachment/delete`;
  public static ASSESSMENT_MODEL_STATUS = `${BASE_URL}/assessmentModel/{modelId}/status`;
  public static ASSESSMENT_MODEL_DOCUMENT_REQUIREMENT_LIST = `${BASE_URL}/assessmentModel/{modelId}/document`;

  // Assessment
  public static ASSESSMENT_LIST = `${BASE_URL}/assessment/listAssessments`;
  public static ASSESSMENT_DETAIL = `${BASE_URL}/assessment`;
  public static ASSESSMENT_DELETE = `${BASE_URL}/assessment`;
  public static ASSESSMENT_SURVEY_LIST = `${BASE_URL}/assessment/survey/list`;
  public static ASSESSMENT_ADD = `${BASE_URL}/assessment/createAssessment`;
  public static ASSESSMENT_EDIT = `${BASE_URL}/assessment/editAssessment`;
  public static ASSESSMENT_UPDATE = `${BASE_URL}/assessment/updateAssessment`;
  public static ASSESSMENT_SURVEY_EDIT = `${BASE_URL}/assessment/survey`;
  public static ASSESSMENT_SURVEY_DELETE = `${BASE_URL}/assessment/survey`;
  public static ASSESSMENT_SURVEY_ADD = `${BASE_URL}/assessment/survey`;
  public static ASSESSMENT_ELEMENT_CRITERIA_BY_LEVEL = `${BASE_URL}/assessment/{assessmentId}/element/{elementId}/{level}`;
  public static ASSESSMENT_ELEMENT_CRITERIA = `${BASE_URL}/assessment/{assessmentId}/element/{elementId}/criterias`;
  public static ASSESSMENT_CRITERIA_DETAIL_UPDATE = `${BASE_URL}/assessment/{assessmentId}/criteria/{criteriaId}`;
  public static ASSESSMENT_CRITERIA_ATTACHMENT_REMOVE = `${BASE_URL}/assessment/{assessmentId}/criteria/{criteriaId}/attachment/{attachmentId}`;
  public static ASSESSMENT_EVALUATE = `${BASE_URL}/assessment/evaluate`;

  public static ASSESSMENT_BEST_PRACTICE_LIST = `${BASE_URL}/assessmentModel/bestPractice/list`;
  public static ASSESSMENT_MODEL_NAMES = `${BASE_URL}/assessmentModel`;
  public static ASSESSMENT_MODEL_ELEMENTS = `${BASE_URL}/assessmentModel/allElements`;
  public static ASSESSMENT_MODEL_ALL_SUB_ELEMENTS = `${BASE_URL}/assessmentModel/allSubElements`;
  public static ASSESSMENT_MODEL_ALL_CRITERIA = `${BASE_URL}/assessmentModel/allCriteria`;
  public static ASSESSMENT_ADD_BEST_PRACTICE = `${BASE_URL}/assessmentModel/addBestPractice`;
  public static ASSESSMENT_EDIT_BEST_PRACTICE = `${BASE_URL}/assessmentModel/editBestPractice`;
  public static ASSESSMENT_BEST_PRACTICE = `${BASE_URL}/assessmentModel/bestPractice`;
  public static ASSESSMENT_AUTHORITY = `${BASE_URL}/assessment/{assessmentId}/authority`;
  public static ASSESSMENT_DASHBOARD = `${BASE_URL}/assessment/{assessmentId}/dashboard`;
  public static ASSESSMENT_DASHBOARD_CRITERIA = `${BASE_URL}/assessment/{assessmentId}/dashbaord/criterias`;
  public static ASSESSMENT_REPORT = `${BASE_URL}/assessment/{assessmentId}/report`;


  public static ASSESSMENT_QUESTIONNAIRE = `${BASE_URL}/assessment/{assessmentId}/questionnaire`;
  public static ASSESSMENT_QUESTIONNAIRE_LIST = `${BASE_URL}/assessment/{assessmentId}/questionnaire/list`;
  public static ASSESSMENT_QUESTIONNAIRE_CRITERIA = `${BASE_URL}/assessment/{assessmentId}/questionnaire/criteriaList`;
  public static ASSESSMENT_ASSIGN_QUESTION = `${BASE_URL}/assessment/{assessmentId}/questionnaire/assign`;
  public static ASSESSMENT_ANSWER_QUESTION = `${BASE_URL}/assessment/{assessmentId}/question/{questionId}/answer`;
  // Assessment team
  public static ASSESSMENT_TEAM = `${BASE_URL}/assessment/{assessmentId}/team`;
  public static ASSESSMENT_TEAM_MEMBER_REMOVE = `${BASE_URL}/assessment/{assessmentId}/team/remove-members`;
  public static ASSESSMENT_PLAN = `${BASE_URL}/assessment/{assessmentId}/plan`;

  // Improvement plan
  public static IMPROVEMENT_PLAN = `${BASE_URL}/improvementPlan`;
  public static IMPROVEMENT_PLAN_LIST = `${BASE_URL}/improvementPlan/list`;
  public static IMPROVEMENT_PLAN_ASSESSMENT_LIST = `${BASE_URL}/improvementPlan/{planId}/assessments`;
  public static IMPROVEMENT_PLAN_TARGET = `${BASE_URL}/improvementPlan/{planId}/target`;
  public static IMPROVEMENT_PLAN_GAP_ANALYSIS = `${BASE_URL}/improvementPlan/{planId}/gap`;
  public static IMPROVEMENT_PLAN_ACTION_PLAN = `${BASE_URL}/improvementPlan/{planId}/actionPlan`;
  public static IMPROVEMENT_PLAN_ACTION_PLAN_ACTION = `${BASE_URL}/improvementPlan/{planId}/action`;
  public static IMPROVEMENT_PLAN_REPORT = `${BASE_URL}/improvementPlan/{planId}/report`;


  // Model Documents

  public static MODEL_DOCUMENT_BY_ORGANISATION = `${BASE_URL}/organization/{orgId}/model/{modelId}/documentStatics`;
  public static ORGANISATION_MODEL_DOCUMENTS = `${BASE_URL}/organization/{orgId}/document`;
  public static ORGANISATION_MODEL_DOCUMENTS_IMPORT = `${BASE_URL}/assessmentModel/{modelId}/importDocument`;
}
