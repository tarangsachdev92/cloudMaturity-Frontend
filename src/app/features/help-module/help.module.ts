import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpListComponent, HelpVideoComponent } from './components';
import { UtilityModule } from '@app/utility';
import { MaterialModule } from '@app/material';


@NgModule({
  declarations: [HelpListComponent, HelpVideoComponent],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
