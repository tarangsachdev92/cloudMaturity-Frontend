import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService, SnackBarService } from '../services';

import { HttpStatus } from '@app/utility';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private _sharedService: SharedService, private _snackBarService: SnackBarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtReq = request.clone();
    // Pass on the cloned request instead of the original request.
    return next.handle(jwtReq).pipe(
      tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          let message = 'Could not process the request. Please try again.';
          if ([HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].indexOf(err.status) !== -1) {
            message = 'Unauthorized access! please login again'
            this._sharedService.logout();
            // location.reload(true);
          } else if (err.error && err.error.message && err.error.message.length > 0) {
            message = err.error.message;
          }
          this._snackBarService.setSnackBarMessage(message);
        }
      })
    );
  }
}
