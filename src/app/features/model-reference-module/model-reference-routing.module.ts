import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentRouteConstants, ModelDetailEnum } from '@app/utility';
import { AssessmentModelCriteriaDetailsComponent, ModelDetailsContainerComponent } from '../dashboard-module/components';
import { CriteriaDetailResolverService, ModelDetailResolverService } from '../dashboard-module/services';
import { ModelReferenceConfigurationComponent, ModelReferenceListComponent } from './components';

const routes: Routes = [
  {
    path: AssessmentRouteConstants.MODEL_REFERENCE_ROUTE,
    component: ModelReferenceListComponent,
    data: {
      breadcrumb: [{ title: '', routerLink: '' }]
    },
  },
  {
    path: "model",
    component: ModelReferenceConfigurationComponent,
    resolve: {
      model: ModelDetailResolverService,
    },
    data: {
      breadcrumb: [{
        title: '{{model.model_name}}',
        routerLinks: ["model-reference/model/", '{{model._id}}']
      }]
    },
    children: [
      {
        path: `:modelId`,
        component: ModelDetailsContainerComponent,
        data: {
          breadcrumb: [{ title: 'Details', routerLink: '' }],
          isModelReference: true
        }
      },
      {
        path: `:modelId/${AssessmentRouteConstants.ASSESSMENT_CRITERIA_DETAILS_ROUTE}/:criteriaId`,
        resolve: {
          criteria: CriteriaDetailResolverService,
        },
        component: AssessmentModelCriteriaDetailsComponent,
        data: {
          breadcrumb: [
            { title: "Practices", routerLinks: ["model-reference/model/", '{{criteria.model_id}}'], modelTab: ModelDetailEnum.PRACTICES },
            { title: "{{criteria.criteria_unique_id}}", routerLink: '' },
          ],
          isModelReference: true
        },
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelReferenceRoutingModule { }
