import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JWTInterceptor} from './jwt-interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptors = [
  {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
];

