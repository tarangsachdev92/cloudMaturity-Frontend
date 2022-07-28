import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelReferenceRoutingModule } from './model-reference-routing.module';
import { UtilityModule } from '@app/utility';
import { MaterialModule } from '@app/material';
import {
  ModelReferenceLeftNavigationComponent, ModelReferenceConfigurationComponent,
  ModelReferenceListComponent
} from './components';
import { ModelReferenceDetailResolverService } from './services';
import { DashboardModule } from '../dashboard-module/dashboard.module';

@NgModule({
  declarations: [
    ModelReferenceListComponent,
    ModelReferenceConfigurationComponent,
    ModelReferenceLeftNavigationComponent,
  ],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    ModelReferenceRoutingModule,
    DashboardModule,
  ], providers: [ModelReferenceDetailResolverService]
})
export class ModelReferenceModule { }
