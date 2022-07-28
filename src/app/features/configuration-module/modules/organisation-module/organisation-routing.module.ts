import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { OrganisationListComponent, OrganisationDetailsComponent } from './components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.ORGANISATION_LIST_ROUTE,
        component: OrganisationListComponent,
        data: {
          breadcrumb: []
        }
      },
      {
        path: AssessmentRouteConstants.ADD_ORGANISATION_ROUTE,
        component: OrganisationDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }]

        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_ORGANISATION_ROUTE}/:id`,
        component: OrganisationDetailsComponent,
        data: {
          breadcrumb: [{ title: "Edit" }]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
