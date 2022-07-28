export class BASE {
  public static TOAST_TIMEOUT = 3000;
  public static ENCRYPTION_TOKEN = "boilerplate";
}

export class HttpStatus {
  public static SUCCESS = 200;
  public static UNAUTHORIZED = 401;
  public static FORBIDDEN = 403;
  public static EXPIRED = 450;
}

export enum ToastStatus {
  UNKNOWN = 0,
  SUCCESS = 1,
  ERROR = 2,
  MULTIPLE = 3,
}

export class AppConstant {
  public static PAGE_SIZE = 20;
  public static NO_DATA = "No data found";
  public static PAGINATION_ARRAY: number[] = [10, 25, 50, 100];
  public static FIVE_MB_IMAGE_SIZE = 5000000;
}

export const globalToastConfig = {
  positionClass: "toast-top-center",
  maxOpened: 1,
  preventDuplicates: true,
};

// IndividualConfig
export const individualToastConfig = {
  timeOut: BASE.TOAST_TIMEOUT,
  closeButton: true,
};

export enum HttpMethodsTypeEnum {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PUT_MULTIPART = "putMultiPart",
  POST_MULTIPART = "postMultiPart",
}

export enum ProfileViewEnum {
  VIEW_PROFILE = "view",
  EDIT_PROFILE = "edit",
  ACCOUNT_SETTINGS = "accountSettings",
  CHANGE_PASSWORD = "changePassword",
  CHANGE_EMAIL = "changeEmail",
  PERSONAL_DATA = "personalData"
}

export enum CompanyStatusEnum {
  REGISTERED = "Registered",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const USER_ROLES = [
  {
    id: 1,
    role_name: "System Admin",
  },
  {
    id: 2,
    role_name: "Company Admin",
  },
  {
    id: 3,
    role_name: "Company - User",
  },
];

export class UserRole {
  public static SYSTEM_ADMIN = 1;
  public static COMPANY_ADMIN = 2;
  public static COMPANY_USER = 3;
}

export const CALCULATION_METHOD = [
  { value: "Stagged", display: "Stagged" },
  { value: "Continous", display: "Continous" },
];


export enum ProcedureViewEnum {
  ASSESSMENT_PROCEDURE = "assessmentProcedure",
  IMPLEMENTATION_PROCEDURE = "implementationProcedure",
  ATTACHMENT = "attachment",
}

export const questionTypes = [
  { value: 1, display: "Yes/No" },
  { value: 2, display: "List of choice" },
  { value: 3, display: "Text Input" },
];

export enum ExpandCollapseEnum {
  "EXPAND_ALL" = "Expand All",
  "COLLAPSE_ALL" = "Collapse All",
}

export enum AssessmentCriteriaStatusEnum {
  NOT_RATED = 0,
  IMPLEMENTED = 1,
  PARTIALLY_IMPLEMENTED = 2,
  NOT_IMPLEMENTED = 3,
}

export const assessmentCriteriaStatus = [
  { display: "Implemented", value: 1 },
  { display: "Partially Implemented", value: 2 },
  { display: "Not Implemented", value: 3 },
];

export const assessmentCriteriaStatusWithNoRated = [
  { display: "Not Rated", value: AssessmentCriteriaStatusEnum.NOT_RATED },
  { display: "Implemented", value: AssessmentCriteriaStatusEnum.IMPLEMENTED },
  { display: "Partially Implemented", value: AssessmentCriteriaStatusEnum.PARTIALLY_IMPLEMENTED },
  { display: "Not Implemented", value: AssessmentCriteriaStatusEnum.NOT_IMPLEMENTED },
];

export const assessmentAuthorities = [
  { display: "All Organisations Users", value: 1 },
  { display: "Assessment Team", value: 2 },
  // { display: "Plan Users", value: 3 },
];

export enum TargetViewEnum {
  OVERALL_TARGET = "overallTarget",
  DETAILED_TARGET = "detailedTarget",
}

export enum TargetLayoutViewEnum {
  NO_TARGET_ADDED = "noTarget",
  TARGET_ADDED = "targetAdded",
  PREVIEW_TARGET = "previewTarget",
}

export const targetTypesList = [
  { display: "Overall Target", value: 0 },
  { display: "Detailed Target", value: 1 },
];


export enum DashboardComponentViewEnum {
  ADD = "add",
  LIST = "list",
  DETAILS = "details"
}

export const maximumLevel = 5;
export const maximumScore = 5;


export enum AssessmentStatusEnum {
  IN_PROGRESS = 0,
  COMPLETED = 1,
  PENDING = 2,
}

export const assessmentStatuses = [
  { value: '0', name: 'In Progress' },
  { value: '1', name: 'Completed' },
  { value: '2', name: 'Pending' }
]

export const actionStatuses = [{ value: 0, display: 'Open' }, { value: 1, display: 'Completed' }]

export const documentStatus = [{ value: 1, display: 'Draft' }, { value: 2, display: 'Approved' }]


export enum UploadTypesEnum {
  LINK = 1,
  ATTACHMENT = 2
}

export const uploadTypes = [{ value: UploadTypesEnum.LINK, display: 'Link' }, { value: UploadTypesEnum.ATTACHMENT, display: 'Attachment' }]

export enum DocumentViewTypeEnum {
  DOC = 1,
  IMG = 2,
}

export const imgExtensions = ['jpg', 'jpeg', 'png', 'svg', 'gif'];

export enum QuestionTypeEnum {
  YES_NO = 1,
  MULTI_SELECT = 2,
  TEXT = 3,
}

export enum ModelDetailEnum {
  BASIC_DATA = 0,
  DOMAINS = 1,
  PRACTICES = 2,
  DOCUMENT_REQUIREMENTS = 3,
}

export enum RoleEnum {
  SUPER_ADMIN = 1,
  COMPANY_ADMIN = 2,
  COMPANY_USER = 3
}