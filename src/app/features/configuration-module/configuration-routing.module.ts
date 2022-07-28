import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CMSAuthGuard } from "@app/core/_gurads";
import { AssessmentRouteConstants, Role } from "@app/utility";
import { ConfigurationContainerComponent } from "./components";

const routes: Routes = [
  {
    path: "",
    redirectTo: AssessmentRouteConstants.ORGANISATION_MANAGEMENT_MODULE,
    pathMatch: "full",
  },
  {
    path: "",
    component: ConfigurationContainerComponent,
    children: [
      {
        path: AssessmentRouteConstants.ORGANISATION_MANAGEMENT_MODULE,
        loadChildren: () =>
          import("./modules/organisation-module/organisation.module").then(
            (m) => m.OrganisationModule
          ),
        canActivate: [CMSAuthGuard],
        data: {
          roles: [Role.COMPANY_ADMIN],
          breadcrumb: [{
            title: "Organisation",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ORGANISATION_MANAGEMENT_MODULE}`
          }],
        },
      },
      {
        path: AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_MODULE,
        loadChildren: () =>
          import(
            "./modules/maturity-level-schema-module/maturity-level-schema.module"
          ).then((m) => m.MaturityLevelSchemaModule),
        canActivate: [CMSAuthGuard],
        data: {
          breadcrumb: [{
            title: "Maturity Level's Schema",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_MODULE}`
          }
          ],
        }
      },
      {
        path: AssessmentRouteConstants.ASSESSMENT_TYPE_MODULE,
        loadChildren: () =>
          import(
            "./modules/assessment-type-module/assessment-type.module"
          ).then((m) => m.AssessmentTypeModule),
        canActivate: [CMSAuthGuard],
        data: {
          breadcrumb: [{
            title: "Assessment Type",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_TYPE_MODULE}`
          }],
        }
      },
      {
        path: AssessmentRouteConstants.ASSESSMENT_SCOPE_MODULE,
        loadChildren: () =>
          import(
            "./modules/assessment-scope-module/assessment-scope.module"
          ).then((m) => m.AssessmentScopeModule),
        canActivate: [CMSAuthGuard],
        data: {
          breadcrumb: [{
            title: "Assessment Scope",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.ASSESSMENT_SCOPE_MODULE}`
          }],
        }
      },
      {
        path: AssessmentRouteConstants.PARTNER_MODULE,
        loadChildren: () =>
          import("./modules/partner-module/partner.module").then(
            (m) => m.PartnerModule
          ),
        canActivate: [CMSAuthGuard],
        data: {
          roles: [Role.COMPANY_ADMIN],
          breadcrumb: [{
            title: "Partners",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.PARTNER_MODULE}`
          }],
        },
      },
      {
        path: AssessmentRouteConstants.USER_MANAGEMENT_MODULE,
        loadChildren: () =>
          import(
            "./modules/user-management-module/user-management.module"
          ).then((m) => m.UserManagementModule),
        canActivate: [CMSAuthGuard],
        data: {
          roles: [Role.COMPANY_ADMIN],
          breadcrumb: [{
            title: "Users",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.USER_MANAGEMENT_MODULE}`
          }],
        },
      },
      {
        path: AssessmentRouteConstants.DOCUMENT_TYPE_MODULE,
        loadChildren: () =>
          import(
            "./modules/document-type-module/document-type.module"
          ).then((m) => m.DocumentTypeModule),
        canActivate: [CMSAuthGuard],
        data: {
          roles: [Role.COMPANY_ADMIN],
          breadcrumb: [{
            title: "Document Type",
            routerLink: `/${AssessmentRouteConstants.CONFIGURATION_MODULE}/${AssessmentRouteConstants.DOCUMENT_TYPE_MODULE}`
          }],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule { }
