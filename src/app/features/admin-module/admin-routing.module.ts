import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { CompaniesListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.COMPANY_LIST_ROUTE,
        component: CompaniesListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
