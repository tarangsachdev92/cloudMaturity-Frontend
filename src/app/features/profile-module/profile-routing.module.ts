import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { ProfileContainerComponent } from './components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.PROFILE_ROUTE,
        component: ProfileContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
