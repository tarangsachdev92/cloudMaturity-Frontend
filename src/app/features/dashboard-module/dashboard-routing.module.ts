import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AssessmentRouteConstants, ModelDetailEnum } from "@app/utility";
import {
  ImprovementPlanContainerComponent,
  ModelConfigurationComponent,
  ModelImprovementPlanContainerComponent,
  ModelListComponent,
  AssessmentCriteriaComponent,
  AssessmentSurveyContainerComponent,
  ModelAssessmentsContainerComponent,
  AddModelComponent,
  AssessmentModelCriteriaDetailsComponent,
  ModelDetailsContainerComponent,
} from "./components";
import { DocumentsFileModelComponent } from "./components/documents-file-components";
import {
  AssessmentDetailResolverService,
  CriteriaDetailResolverService,
  ImprovementPlanDetailResolverService,
  ModelDetailResolverService
} from "./services";

const routes: Routes = [
  {
    path: AssessmentRouteConstants.MODEL_LIST_ROUTE,
    component: ModelListComponent,
    data: {
      breadcrumb: [{ title: '', routerLink: '' }]
    },
  },
  {
    path: "model",
    component: ModelConfigurationComponent,
    resolve: {
      model: ModelDetailResolverService,
    },
    data: {
      breadcrumb: [{
        title: '{{model.model_name}}',
        routerLinks: ["dashboard/model/", '{{model._id}}']
      }]
    },
    children: [
      {
        path: AssessmentRouteConstants.ADD_MODEL_ROUTE,
        component: AddModelComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        },
      },
      {
        path: `:modelId`,
        component: ModelDetailsContainerComponent,
        data: {
          breadcrumb: [{ title: 'Details', routerLink: '' }]
        },
      },
      {
        path: `:modelId/${AssessmentRouteConstants.ASSESSMENT_CRITERIA_DETAILS_ROUTE}/:criteriaId`,
        resolve: {
          criteria: CriteriaDetailResolverService,
        },
        component: AssessmentModelCriteriaDetailsComponent,
        data: {
          breadcrumb: [
            { title: "Practices", routerLinks: ["dashboard/model/", '{{criteria.model_id}}'], modelTab: ModelDetailEnum.PRACTICES },
            { title: "{{criteria.criteria_unique_id}}", routerLink: '' }
          ],
        },
      },
      {
        path: `:modelId/${AssessmentRouteConstants.MODEL_ASSESSMENT_DETAIL_ROUTE}/:assessmentId`,
        component: AssessmentSurveyContainerComponent,
        resolve: {
          assessment: AssessmentDetailResolverService
        },
        data: {
          breadcrumb: [
            {
              title: 'Assessments',
              routerLinks: ["dashboard/model/", '{{assessment.model_id}}', '/assessments']
            },
            { title: '{{assessment.assessment_unique_id}}', routerLink: '/' }
          ],
        },
      },
      {
        path: `:modelId/${AssessmentRouteConstants.MODEL_ASSESSMENTS_ROUTE}`,
        component: ModelAssessmentsContainerComponent,
        data: {
          breadcrumb: [
            { title: 'Assessments', routerLink: '' },
          ],
        },
      },
      {
        path: `:modelId/${AssessmentRouteConstants.MODEL_ASSESSMENT_PLAN_DETAIL_ROUTE}/:planId`,
        component: AssessmentCriteriaComponent,
        resolve: {
          assessment: AssessmentDetailResolverService
        },
        data: {
          breadcrumb: [
            {
              title: 'Assessments',
              routerLinks: ["dashboard/model/", '{{assessment.model_id}}', '/assessments']
            },
            {
              title: '{{assessment.assessment_unique_id}}',
              routerLinks: ["dashboard/model/", '{{assessment.model_id}}', '/assessments/', '{{assessment._id}}']
            },
            { title: 'Assessment Plan Details', routerLink: '' }
          ],
        },
      },
      {
        path: `:modelId/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLANS_ROUTE}`,
        component: ModelImprovementPlanContainerComponent,
        data: {
          breadcrumb: [
            { title: 'Improvement Plans', routerLink: '' },
          ],
        },
      },
      {
        path: `:modelId/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLAN_DETAILS_ROUTE}/:improvementPlanId`,
        component: ImprovementPlanContainerComponent,
        resolve: {
          improvementPlan: ImprovementPlanDetailResolverService
        },
        data: {
          breadcrumb: [
            {
              title: 'Improvement Plans',
              routerLinks:
                [
                  "dashboard/model/",
                  '{{improvementPlan.model_id.model_id}}',
                  '/improvement-plans'
                ]
            },
            { title: '{{improvementPlan.plan_id}}', routerLink: '' },
          ],
        },
      },

      {
        path: `:modelId/${AssessmentRouteConstants.DOCUMENTS_MODEL_ROUTE}`,
        component: DocumentsFileModelComponent,
        data: {
          breadcrumb: [{ title: 'Documents', routerLink: '' }],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
