import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaturityLevelSchemaRoutingModule } from './maturity-level-schema-routing.module';
import { schemaComponents } from './components/maturity-level-schema-component.export';
import { UtilityModule } from '@app/utility';
import { MaterialModule } from '@app/material';
import { MaturityLevelSchemaService } from './services';


@NgModule({
  declarations: [...schemaComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    MaturityLevelSchemaRoutingModule
  ], providers: [
    MaturityLevelSchemaService
  ]
})
export class MaturityLevelSchemaModule { }
