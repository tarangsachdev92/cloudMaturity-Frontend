import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentTypeRoutingModule } from './assessment-type-routing.module';
import { UtilityModule } from '@app/utility';
import { MaterialModule } from '@app/material';
import { assessmentTypeComponents } from './components/assessment-type-component.export';
import { AssessmentTypeService } from './services';

@NgModule({
  declarations: [...assessmentTypeComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    AssessmentTypeRoutingModule
  ],
  providers: [
    AssessmentTypeService
  ]
})
export class AssessmentTypeModule { }
