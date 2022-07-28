import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentScopeDetailsComponent, AssessmentScopeListComponent } from './components';
import { AssessmentRouteConstants } from '@app/utility';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.ASSESSMENT_SCOPE_LIST_ROUTE,
        component: AssessmentScopeListComponent,
        data: {
          breadcrumb: [],
        }
      },
      {
        path: AssessmentRouteConstants.ADD_ASSESSMENT_SCOPE_ROUTE,
        component: AssessmentScopeDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_ASSESSMENT_SCOPE_ROUTE}/:id`,
        component: AssessmentScopeDetailsComponent,
        data: {
          breadcrumb: [{ title: "Edit" }],
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentScopeRoutingModule { }
