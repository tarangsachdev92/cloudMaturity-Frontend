import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/core';
import { AssessmentRouteConstants, Role } from '@app/utility';

@Component({
  selector: 'app-configuration-left-navigation',
  templateUrl: './configuration-left-navigation.component.html',
  styleUrls: ['./configuration-left-navigation.component.scss']
})
export class ConfigurationLeftNavigationComponent implements OnInit {

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
  }

  get organisationUrl() {
    return "/" + AssessmentRouteConstants.ORGANISATION_LIST;
  }

  get maturitySchemaUrl() {
    return "/" + AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_LIST;
  }

  get assessmentTypeUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_TYPE_LIST;
  }

  get assessmentScopeUrl() {
    return "/" + AssessmentRouteConstants.ASSESSMENT_SCOPE_LIST;
  }

  get partnerUrl() {
    return "/" + AssessmentRouteConstants.PARTNER_LIST;
  }

  get usersUrl() {
    return "/" + AssessmentRouteConstants.USERS_LIST;
  }

  get isCompanyAdmin() {
    return this._sharedService.getUserRole() == Role.COMPANY_ADMIN;
  }

  get documentTypeUrl() {
    return "/" + AssessmentRouteConstants.DOCUMENT_TYPE_LIST;
  }
}
