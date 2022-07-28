import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { UserManagementDetailsComponent, UserManagementListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.USERS_ROUTE,
        component: UserManagementListComponent,
        data: {
          breadcrumb: [],
        }
      },
      {
        path: AssessmentRouteConstants.ADD_USERS_ROUTE,
        component: UserManagementDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_USER_ROUTE}/:id`,
        component: UserManagementDetailsComponent,
        data: {
          breadcrumb: [{ title: "Edit" }],
        }
      }
    ]
  }
];

const routes1: Routes = [
  {
    path: AssessmentRouteConstants.USERS_ROUTE,
    component: UserManagementListComponent
  },
  {
    path: AssessmentRouteConstants.ADD_USERS_ROUTE,
    component: UserManagementDetailsComponent
  },
  {
    path: `${AssessmentRouteConstants.EDIT_USER_ROUTE}/:id`,
    component: UserManagementDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
