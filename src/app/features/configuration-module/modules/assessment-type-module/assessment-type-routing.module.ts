import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentTypeListComponent, AssessmentTypeDetailsComponent } from './components';
import { AssessmentRouteConstants } from '@app/utility';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.ASSESSMENT_TYPE_LIST_ROUTE,
        component: AssessmentTypeListComponent,
        data: {
          breadcrumb: []
        }
      },
      {
        path: AssessmentRouteConstants.ADD_ASSESSMENT_TYPE_ROUTE,
        component: AssessmentTypeDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_ASSESSMENT_TYPE_ROUTE}/:id`,
        component: AssessmentTypeDetailsComponent,
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
export class AssessmentTypeRoutingModule { }
