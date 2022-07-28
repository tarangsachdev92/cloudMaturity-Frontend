import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {UtilityModule} from '@app/utility';
import {MaterialModule} from '@app/material';
import {adminComponents} from './components/component-export';


@NgModule({
  declarations: [...adminComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
