import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { documentTypeComponents } from './document-type-component.export';
import { MaterialModule } from '@app/material';
import { UtilityModule } from '@app/utility';
import { DocumentTypeService } from './services';

@NgModule({
  declarations: [
    ...documentTypeComponents
  ],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    DocumentTypeRoutingModule
  ],
  providers: [
    DocumentTypeService
  ]
})
export class DocumentTypeModule { }
