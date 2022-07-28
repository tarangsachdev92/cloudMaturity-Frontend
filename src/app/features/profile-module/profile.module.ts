import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { profileComponents } from './components/component-export';
import { UtilityModule } from '@app/utility';
import { MaterialModule } from '@app/material';

@NgModule({
  declarations: [...profileComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
