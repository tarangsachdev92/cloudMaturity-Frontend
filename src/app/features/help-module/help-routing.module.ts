import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { HelpListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.HELP_ROUTE,
        component: HelpListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
