export class CommonRegexp {
  public static NUMERIC_REGEXP = "^[0-9]*$";
  public static PHONE_NUMBER_REGEXP = "^[0-9+ ]*$";
  public static ALPHA_NUMERIC_REGEXP = "^[A-Za-z0-9 ]*$";
  public static ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP = "^[A-Za-z0-9-.,&' _]*$";
  public static ALPHABETS_REGEXP = "^[A-Za-z ]*$";
  public static USER_NAME_REGEXP =
    "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z\\d#?.!@$%^&*-]+$";
  public static EMAIL_ADDRESS_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d#?!@$%^&*-]{8,}$/;
  //between 0-10 and ALLOW only one . and after decimal only allow 1 decimal number
  public static WEIGHT_REGEXP = /^([0-9]|1[0])?(\.\d{0,1})?$/;
}

export class ValidationConstant {
  public REQUIRED = ` is required`;
  public VALID = `Please enter valid `;

  public EMAIL = `Email ${this.REQUIRED}`;
  public CAPTCHA_REQUIRED = `Captcha ${this.REQUIRED}`;
  public EMAIL_VALID = this.VALID + `email address`;
  public EMAIL_LENGTH = `Email length between 6 to 50 characters`;

  public PASSWORD = `Password` + this.REQUIRED;
  public PASSWORD_VALID = this.VALID + `password`;
  public PASSWORD_LENGTH = `Password length between 8 to 50 characters`;

  public OLD_PASSWORD = `Current password` + this.REQUIRED;
  public OLD_PASSWORD_LENGTH = `Password length between 8 to 50 characters`;

  public CONFIRM_PASSWORD = `Confirm password` + this.REQUIRED;
  public PASSWORD_DOESNT_MATCH = `Confirm password should be same as password`;

  public OTP = `OTP` + this.REQUIRED;
  public OTP_VALID = this.VALID + `OTP`;
  public OTP_LENGTH = `OTP length 6 digits only`;

  public FULL_NAME = `Full name` + this.REQUIRED;
  public FULL_NAME_VALID = `Please enter valid full name`;
  public FULL_NAME_LENGTH = `Full name length between 2 to 40 characters`;

  public MOBILE_NUMBER = `Mobile number` + this.REQUIRED;
  public MOBILE_NUMBER_VALID = `Please enter a valid mobile number`;
  public MOBILE_NUMBER_LENGTH = `Mobile number length between 7 to 13 digits`;

  public COMPANY_NAME = `Company name` + this.REQUIRED;
  public COMPANY_VALID = `Please enter valid company name`;
  public COMPANY_NAME_LENGTH = `First name length between 2 to 50 characters`;

  public REG_NUMBER_VALID = `Registration number` + this.REQUIRED;
  public REG_NUMBER_LENGTH = `Registration number length between 1 to 20 characters`;

  public MEMBERS_VALID = `Members` + this.REQUIRED;
  public MEMBERS_LENGTH = `Members length between 1 to 10 digits`;

  public COUNTRY_VALID = `Country` + this.REQUIRED;
  public COUNTRY_LENGTH = `Country length between 1 to 10 digits`;

  public ADDRESS_VALID = `Please enter valid address`;
  public ADDRESS_LENGTH = `Address length between 2 to 200 characters`;

  public PHONE_VALID = `Please enter valid phone number`;
  public PHONE_LENGTH = `Phone number length between 7 to 13 digits`;

  public ROLE = `Role` + this.REQUIRED;

  public ORGANISATION_NAME = `Organisation name` + this.REQUIRED;
  public ORGANISATION_VALID = `Please enter valid organisation name`;
  public ORGANISATION_LENGTH = `Organisation name length between 1 to 255 characters`;

  public ELEMENT_NAME = `Domain name` + this.REQUIRED;
  public ELEMENT_NAME_VALID = `Please enter valid element name`;
  public ELEMENT_NAME_LENGTH = `Domain name length between 2 to 10 characters`;

  public SUB_ELEMENT_NAME = `Sub domain name` + this.REQUIRED;
  public SUB_ELEMENT_NAME_VALID = `Please enter valid sub domain name`;
  public SUB_ELEMENT_NAME_LENGTH = `Sub domain name length between 2 to 10 characters`;

  public DESCRIPTION_VALID = `Please enter valid description`;
  public DESCRIPTION_LENGTH = `Description length between 2 to 500 characters`;
  public DESCRIPTION_REQUIRED = `Description` + this.REQUIRED;

  public ORG_NAME = `Organisation name` + this.REQUIRED;
  public ORG_NAME_VALID = `Please enter valid organisation name`;
  public ORG_NAME_LENGTH = `Organisation name length between 2 to 40 characters`;

  public MODEL_NAME = `Model name` + this.REQUIRED;
  public MODEL_NAME_VALID = `Please enter valid model name`;
  public MODEL_NAME_LENGTH = `Model name length between 2 to 40 characters`;

  public PARTNER_NAME = `Partner name` + this.REQUIRED;

  public MATURITY_LEVEL_SCHEMA = `Please select maturity levels key`;

  public CALCULATION_METHOD = `Please select calculation method`;

  public ASSESSMENT_TYPE_NAME = `Assessment type` + this.REQUIRED;
  public ASSESSMENT_TYPE_VALID = `Please enter valid assessment type`;
  public ASSESSMENT_TYPE_LENGTH = `Assessment type length between 2 to 40 characters`;

  public ASSESSMENT_SCOPE_NAME = `Assessment scope` + this.REQUIRED;
  public ASSESSMENT_SCOPE_VALID = `Please enter valid assessment scope`;
  public ASSESSMENT_SCOPE_LENGTH = `Assessment scope length between 2 to 40 characters`;

  public MATURITY_LEVEL_SCHEMA_NAME = `Schema` + this.REQUIRED;
  public MATURITY_LEVEL_DESCRIPTION = `Level description` + this.REQUIRED;
  public MATURITY_LEVEL_SCHEMA_VALID = `Please enter valid Schema`;
  public MATURITY_LEVEL_SCHEMA_LENGTH = `Schema length between 2 to 40 characters`;

  public BEST_PRACTICE_NAME = `Best practice` + this.REQUIRED;
  public BEST_PRACTICE_VALID = `Please enter valid best practice`;
  public BEST_PRACTICE_LENGTH = `Best practice length between 2 to 40 characters`;

  public DOCUMENT_TYPE_NAME = `Document type` + this.REQUIRED;
  public DOCUMENT_TYPE_VALID = `Please enter valid document type`;
  public DOCUMENT_TYPE_LENGTH = `Document type length between 2 to 40 characters`;

  public DURATION_LENGTH = `Duration length between 1 to 10 characters`;

  public COMPLEXITY_LENGTH = `Complexity length between 1 to 10 characters`;

  public ASSESSMENT_ID = `Assessment ID is required`;

  public REQUIREMENT_ID = "ID is required";

  public ASSESSMENT_TYPE_REQUIRED = "Please select Assessment type";

  public PRACTICE_ID = `Practice ID is required`;
  public PRACTICE_ID_LENGTH = `Practice ID length between 2 to 8 characters`;

  public DOCUMENT_LENGTH = `Document length between 2 to 10 characters`;
}
