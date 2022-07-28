import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentScopeRoutingModule } from './assessment-scope-routing.module';
import { MaterialModule } from '@app/material';
import { UtilityModule } from '@app/utility';
import { assessmentScopeComponents } from './components/assessment-scope-component.export';
import { AssessmentScopeService } from './services';

@NgModule({
  declarations: [...assessmentScopeComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    AssessmentScopeRoutingModule
  ], providers: [
    AssessmentScopeService
  ]
})
export class AssessmentScopeModule { }
