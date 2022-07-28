export class AssessmentRouteConstants {
  public static PROFILE_MODULE = "profile";
  public static ADMIN_MODULE = "admin";
  public static USER_MANAGEMENT_MODULE = "user-management";
  public static DOCUMENT_TYPE_MODULE = "document-type";
  public static ORGANISATION_MANAGEMENT_MODULE = "organisation";
  public static ASSESSMENT_MODEL_MANAGEMENT_MODULE = "assessment-model";
  public static ELEMENT_MANAGEMENT_MODULE = "elements";
  public static PARTNER_MODULE = "partner";
  public static MATURITY_SCHEMA_LEVEL_MODULE = "maturity-schema-level";
  public static ASSESSMENT_TYPE_MODULE = "assessment-type";
  public static ASSESSMENT_SCOPE_MODULE = "assessment-scope";
  public static ASSESSMENT_CREATE_MODULE = "assessment";
  public static ASSESSMENT_LIST_MODULE = "assessment";
  public static DASHBOARD_MODULE = "dashboard";
  public static MODEL_MODULE = "model";
  public static MODEL_ASSESSMENT_MODULE = "assessments";
  public static MODEL_IMPROVEMENT_PLAN_MODULE = "model-improvement-plan";
  public static CONFIGURATION_MODULE = "configuration";
  public static MODEL_REFERENCE_MODULE = "model-reference";
  public static HELP_MODULE = 'help';

  public static AUTH = "auth";
  public static LOGIN = "login";
  public static AUTH_LOGIN = `${AssessmentRouteConstants.AUTH}/login`;
  public static SIGN_UP = "signup";
  public static AUTH_SIGN_UP = `${AssessmentRouteConstants.AUTH}/signup`;
  public static FORGOT_PASSWORD = "forgot";
  public static AUTH_FORGOT_PASSWORD = `${AssessmentRouteConstants.AUTH}/forgot`;

  public static ADD = "add";
  public static EDIT = "edit";

  public static PROFILE_ROUTE = "";
  public static PROFILE = `${AssessmentRouteConstants.PROFILE_MODULE}/${AssessmentRouteConstants.PROFILE_ROUTE}`;

  // ELEMENTS LIST ROUTES
  public static ELEMENT_LIST_ROUTE = ``;
  public static ELEMENT_LIST = `${AssessmentRouteConstants.ELEMENT_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ELEMENT_LIST_ROUTE}`;

  // ASSESSMENT CREATE
  public static ASSESSMENT_CREATE_ROUTE = "create";
  public static ASSESSMENT_CREATE = `${AssessmentRouteConstants.ASSESSMENT_CREATE_MODULE}/${AssessmentRouteConstants.ASSESSMENT_CREATE_ROUTE}`;

  public static ASSESSMENT_SURVEY_ROUTE = "survey";
  public static ASSESSMENT_SURVEY = `${AssessmentRouteConstants.ASSESSMENT_CREATE_MODULE}/${AssessmentRouteConstants.ASSESSMENT_SURVEY_ROUTE}`;

  // ASSESSMENT LIST
  public static ASSESSMENT_FILTER_ROUTE = "filter";
  public static ASSESSMENT_FILTER = `${AssessmentRouteConstants.ASSESSMENT_LIST_MODULE}/${AssessmentRouteConstants.ASSESSMENT_FILTER_ROUTE}`;

  public static ASSESSMENT_LIST_ROUTE = "filter/list";
  public static ASSESSMENT_LIST = `${AssessmentRouteConstants.ASSESSMENT_LIST_MODULE}/${AssessmentRouteConstants.ASSESSMENT_LIST_ROUTE}`;

  // ASSESSMENT MODEL LIST
  public static ASSESSMENT_MODEL_LIST_ROUTE = "list";
  public static ASSESSMENT_MODEL_LIST = `${AssessmentRouteConstants.ASSESSMENT_MODEL_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ASSESSMENT_MODEL_LIST_ROUTE}`;

  public static ADD_ASSESSMENT_MODEL_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_ASSESSMENT_MODEL_ROUTE = `${AssessmentRouteConstants.EDIT}`;
  public static ASSESSMENT_MODEL_ELEMENT_ROUTE = "elements";
  public static ADD_ASSESSMENT_MODEL = `${AssessmentRouteConstants.ASSESSMENT_MODEL_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ADD_ASSESSMENT_MODEL_ROUTE}`;
  public static EDIT_ASSESSMENT_MODEL = `${AssessmentRouteConstants.ASSESSMENT_MODEL_MANAGEMENT_MODULE}/${AssessmentRouteConstants.EDIT_ASSESSMENT_MODEL_ROUTE}`;
  public static ASSESSMENT_MODEL_ELEMENT_LIST = `${AssessmentRouteConstants.ASSESSMENT_MODEL_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ASSESSMENT_MODEL_ELEMENT_ROUTE}`;

  // ADMIN ROUTES
  public static COMPANY_LIST_ROUTE = "companies";
  public static COMPANY_LIST = `${AssessmentRouteConstants.ADMIN_MODULE}/${AssessmentRouteConstants.COMPANY_LIST_ROUTE}`;

  // NEW UI ROUTES

  // DASHBOARD ROUTES
  public static MODEL_LIST_ROUTE = "";
  public static MODEL_LIST = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_LIST_ROUTE}`;

  // MODEL ROUTES
  public static MODEL_DETAILS_ROUTE = "";
  public static MODEL_DETAILS = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}`;

  public static ADD_MODEL_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static ADD_MODEL = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/${AssessmentRouteConstants.ADD_MODEL_ROUTE}`;

  public static ASSESSMENT_CRITERIA_DETAILS_ROUTE = `criteria`;
  public static ASSESSMENT_CRITERIA_DETAILS = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.ASSESSMENT_CRITERIA_DETAILS_ROUTE}`;

  // MODEL ASSESSMENT ROUTES
  public static MODEL_ASSESSMENTS_ROUTE = "assessments";
  public static MODEL_ASSESSMENTS = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.MODEL_ASSESSMENTS_ROUTE}`;
  public static MODEL_ASSESSMENT_DETAIL_ROUTE = `assessments`;
  public static MODEL_ASSESSMENT_PLAN_DETAIL_ROUTE = `assessments/:assessmentId/plan`;
  public static MODEL_ASSESSMENT_PLAN_ROUTE = `plan`;
  public static MODEL_ASSESSMENT_DETAIL = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL_ROUTE}`;
  public static MODEL_ASSESSMENT_PLAN_DETAIL = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL_ROUTE}/:assessmentId/${AssessmentRouteConstants.MODEL_ASSESSMENT_PLAN_ROUTE}`;

  // public static ASSESSMENT_CRITERIA = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_ASSESSMENT_MODULE}/${AssessmentRouteConstants.ASSESSMENT_CRITERIA_ROUTE}`;

  // MODEL IMPROVEMENT PLAN ROUTES
  public static MODEL_IMPROVEMENT_PLANS_ROUTE = "improvement-plans";
  public static MODEL_IMPROVEMENT_PLANS = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLANS_ROUTE}`;
  public static MODEL_IMPROVEMENT_PLAN_DETAILS_ROUTE = `improvement-plans`;
  public static MODEL_IMPROVEMENT_PLAN_DETAILS = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLAN_DETAILS_ROUTE}`;

  public static DOCUMENTS_MODEL_ROUTE = "documents";
  public static DOCUMENTS_MODEL = `${AssessmentRouteConstants.DASHBOARD_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.DOCUMENTS_MODEL_ROUTE}`;

  // CONFIGURATION ROUTES
  public static CONFIGURATION_ROUTE = "";
  public static CONFIGURATION = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.CONFIGURATION_ROUTE}`;

  // USER MODULE ROUTE
  public static USERS_ROUTE = "users";
  public static USERS_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.USER_MANAGEMENT_MODULE}/${AssessmentRouteConstants.USERS_ROUTE}`;

  public static ADD_USERS_ROUTE = `${AssessmentRouteConstants.USERS_ROUTE}/${AssessmentRouteConstants.ADD}`;
  public static EDIT_USER_ROUTE = `${AssessmentRouteConstants.USERS_ROUTE}/${AssessmentRouteConstants.EDIT}`;
  public static ADD_USERS = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.USER_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ADD_USERS_ROUTE}`;
  public static EDIT_USER = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.USER_MANAGEMENT_MODULE}/${AssessmentRouteConstants.EDIT_USER_ROUTE}`;

  // PARTNER MODEL ROUTES
  public static PARTNER_LIST_ROUTE = "";
  public static PARTNER_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.PARTNER_MODULE}/${AssessmentRouteConstants.PARTNER_LIST_ROUTE}`;

  public static ADD_PARTNER_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_PARTNER_ROUTE = `${AssessmentRouteConstants.EDIT}`;
  public static ADD_PARTNER = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.PARTNER_MODULE}/${AssessmentRouteConstants.ADD_PARTNER_ROUTE}`;
  public static EDIT_PARTNER = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.PARTNER_MODULE}/${AssessmentRouteConstants.EDIT_PARTNER_ROUTE}`;

  // MATURITY SCHEMA LEVEL
  public static MATURITY_SCHEMA_LEVEL_LIST_ROUTE = "";
  public static MATURITY_SCHEMA_LEVEL_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_MODULE}/${AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_LIST_ROUTE}`;

  public static ADD_MATURITY_SCHEMA_LEVEL_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_MATURITY_SCHEMA_LEVEL_ROUTE = `${AssessmentRouteConstants.EDIT}`;
  public static ADD_MATURITY_SCHEMA_LEVEL = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_MODULE}/${AssessmentRouteConstants.ADD_MATURITY_SCHEMA_LEVEL_ROUTE}`;
  public static EDIT_MATURITY_SCHEMA_LEVEL = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_MODULE}/${AssessmentRouteConstants.EDIT_MATURITY_SCHEMA_LEVEL_ROUTE}`;

  // ASSESSMENT TYPE
  public static ASSESSMENT_TYPE_LIST_ROUTE = "";
  public static ASSESSMENT_TYPE_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_TYPE_MODULE}/${AssessmentRouteConstants.ASSESSMENT_TYPE_LIST_ROUTE}`;

  public static ADD_ASSESSMENT_TYPE_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_ASSESSMENT_TYPE_ROUTE = `${AssessmentRouteConstants.EDIT}`;
  public static ADD_ASSESSMENT_TYPE = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_TYPE_MODULE}/${AssessmentRouteConstants.ADD_ASSESSMENT_TYPE_ROUTE}`;
  public static EDIT_ASSESSMENT_TYPE = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_TYPE_MODULE}/${AssessmentRouteConstants.EDIT_ASSESSMENT_TYPE_ROUTE}`;

  // ASSESSMENT SCOPE
  public static ASSESSMENT_SCOPE_LIST_ROUTE = "";
  public static ASSESSMENT_SCOPE_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_SCOPE_MODULE}/${AssessmentRouteConstants.ASSESSMENT_SCOPE_LIST_ROUTE}`;

  public static ADD_ASSESSMENT_SCOPE_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_ASSESSMENT_SCOPE_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static ADD_ASSESSMENT_SCOPE = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_SCOPE_MODULE}/${AssessmentRouteConstants.ADD_ASSESSMENT_SCOPE_ROUTE}`;
  public static EDIT_ASSESSMENT_SCOPE = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_SCOPE_MODULE}/${AssessmentRouteConstants.EDIT_ASSESSMENT_SCOPE_ROUTE}`;

  // DOCUMENT TYPE
  public static DOCUMENT_TYPE_LIST_ROUTE = "";
  public static DOCUMENT_TYPE_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.DOCUMENT_TYPE_MODULE}/${AssessmentRouteConstants.DOCUMENT_TYPE_LIST_ROUTE}`;

  public static ADD_DOCUMENT_TYPE_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_DOCUMENT_TYPE_ROUTE = `${AssessmentRouteConstants.EDIT}`;
  public static ADD_DOCUMENT_TYPE = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.DOCUMENT_TYPE_MODULE}/${AssessmentRouteConstants.ADD_DOCUMENT_TYPE_ROUTE}`;
  public static EDIT_DOCUMENT_TYPE = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.DOCUMENT_TYPE_MODULE}/${AssessmentRouteConstants.EDIT_DOCUMENT_TYPE_ROUTE}`;

  // ORGANISATION ROUTES
  public static ORGANISATION_LIST_ROUTE = ``;
  public static ORGANISATION_LIST = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ORGANISATION_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ORGANISATION_LIST_ROUTE}`;

  public static ADD_ORGANISATION_ROUTE = `${AssessmentRouteConstants.ADD}`;
  public static EDIT_ORGANISATION_ROUTE = `${AssessmentRouteConstants.EDIT}`;
  public static ADD_ORGANISATION = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ORGANISATION_MANAGEMENT_MODULE}/${AssessmentRouteConstants.ADD_ORGANISATION_ROUTE}`;
  public static EDIT_ORGANISATION = `${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ORGANISATION_MANAGEMENT_MODULE}/${AssessmentRouteConstants.EDIT_ORGANISATION_ROUTE}`;

  // MODEL REFERENCE ROUTES
  public static MODEL_REFERENCE_ROUTE = "";
  public static MODEL_REFERENCE = `${AssessmentRouteConstants.MODEL_REFERENCE_MODULE}/${AssessmentRouteConstants.MODEL_REFERENCE_ROUTE}`;
  public static MODEL_REFERENCE_DETAILS = `${AssessmentRouteConstants.MODEL_REFERENCE_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}`;
  public static MODEL_REFERENCE_CRITERIA_DETAILS = `${AssessmentRouteConstants.MODEL_REFERENCE_MODULE}/${AssessmentRouteConstants.MODEL_MODULE}/:modelId/${AssessmentRouteConstants.ASSESSMENT_CRITERIA_DETAILS_ROUTE}`;

  // HELP ROUTES
  public static HELP_ROUTE = "";
  public static HELP = `${AssessmentRouteConstants.HELP_MODULE}/${AssessmentRouteConstants.HELP_ROUTE}`;
}

export const publicRoutes = [
  `/${AssessmentRouteConstants.AUTH_LOGIN}`,
  `/${AssessmentRouteConstants.AUTH_FORGOT_PASSWORD}`,
  `/${AssessmentRouteConstants.AUTH_SIGN_UP}`,
];
