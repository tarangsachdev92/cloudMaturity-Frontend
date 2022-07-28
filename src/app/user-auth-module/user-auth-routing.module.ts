import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthLoginContainerComponent, UserAuthSignContainerComponent, UserAuthForgotContainerComponent } from './components';
import { AssessmentRouteConstants } from '@app/utility';

const routes: Routes = [
  {
    path: '',
    redirectTo: AssessmentRouteConstants.LOGIN
  },
  {
    path: AssessmentRouteConstants.LOGIN,
    component: UserAuthLoginContainerComponent,
  },
  {
    path: AssessmentRouteConstants.SIGN_UP,
    component: UserAuthSignContainerComponent,
  },
  {
    path: AssessmentRouteConstants.FORGOT_PASSWORD,
    component: UserAuthForgotContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule {

}
