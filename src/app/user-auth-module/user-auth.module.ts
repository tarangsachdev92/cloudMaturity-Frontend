import { NgModule } from '@angular/core';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { CommonModule } from '@angular/common';

import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';


import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';
import { environment } from '@env/environment';
import { authComponents } from './components/component-export';

import { UserAuthService } from './services';
import { UtilityModule } from '@app/utility';

@NgModule({
  declarations: [
    [...authComponents]
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RecaptchaModule,
    // RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    UtilityModule,
    ReactiveFormsModule,
    MaterialModule,
    UserAuthRoutingModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.CAPTCHA_SITE_KEY } as RecaptchaSettings
    },
    UserAuthService
  ]
})

export class UserAuthModule {
}
