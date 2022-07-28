import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { PartnerListComponent, PartnerDetailsComponent } from './components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.PARTNER_LIST_ROUTE,
        component: PartnerListComponent,
        data: {
          breadcrumb: [],
        }
      },
      {
        path: AssessmentRouteConstants.ADD_PARTNER_ROUTE,
        component: PartnerDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_PARTNER_ROUTE}/:id`,
        component: PartnerDetailsComponent,
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
export class PartnerRoutingModule { }
