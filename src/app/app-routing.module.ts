import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AssessmentRouteConstants,
  PageNotFoundComponent,
  Role,
} from '@app/utility';
import { CMSAuthGuard, RoleGurad } from './core/_gurads';
import { CustomPreloadingStrategy } from './custom-preloading';

const routes: Routes = [
  {
    path: '',
    redirectTo: AssessmentRouteConstants.AUTH,
    pathMatch: 'full',
  },
  {
    path: AssessmentRouteConstants.AUTH,
    loadChildren: () =>
      import('./user-auth-module/user-auth.module').then(
        (m) => m.UserAuthModule
      ),
    canActivate: [CMSAuthGuard],
    data: { preload: true },
  },
  {
    path: AssessmentRouteConstants.PROFILE_MODULE,
    loadChildren: () =>
      import('./features/profile-module/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [CMSAuthGuard],
    data: {
      breadcrumb: [{ title: 'Profile' }]
    }
  },
  {
    path: AssessmentRouteConstants.ADMIN_MODULE,
    loadChildren: () =>
      import('./features/admin-module/admin.module').then((m) => m.AdminModule),
    canActivate: [CMSAuthGuard, RoleGurad],
    data: { roles: [Role.SYSTEM_ADMIN] },
  },
  {
    path: AssessmentRouteConstants.DASHBOARD_MODULE,
    loadChildren: () =>
      import('./features/dashboard-module/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [CMSAuthGuard],
    data: {
      preload: true,
      breadcrumb: [{ title: 'Models', routerLink: '/dashboard' }]
    },
  },
  {
    path: AssessmentRouteConstants.CONFIGURATION_MODULE,
    loadChildren: () =>
      import('./features/configuration-module/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
    canActivate: [CMSAuthGuard],
    data: {
      breadcrumb: []
    }
  },
  {
    path: AssessmentRouteConstants.MODEL_REFERENCE_MODULE,
    loadChildren: () =>
      import('./features/model-reference-module/model-reference.module').then(
        (m) => m.ModelReferenceModule
      ),
    canActivate: [CMSAuthGuard],
    data: {
      breadcrumb: [{ title: 'Model References', routerLink: '/model-reference' }]
    }
  },
  {
    path: AssessmentRouteConstants.HELP_MODULE,
    loadChildren: () =>
      import('./features/help-module/help.module').then(
        (m) => m.HelpModule
      ),
    canActivate: [CMSAuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
