import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


import { AssessmentRouteConstants, publicRoutes } from '@app/utility';
import { SharedService } from '../services';
// above import (SharedService from ../services) is intentionally to avoid circular depedencies

@Injectable()
export class CMSAuthGuard implements CanActivate {
    constructor(private router: Router, private _sharedService: SharedService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let activateRoute = true;
        const readURL = state.url.split('?')[0];
        const isPublicRoute = publicRoutes.includes(readURL);
        // redirect to login or dashboard according to logged in status and current url
        if (this._sharedService.isLoggedIn()) {
            if (isPublicRoute) {
                activateRoute = false;
                this.router.navigate(['/' + AssessmentRouteConstants.MODEL_LIST]);
            }
        } else {
            if (!isPublicRoute) {
                activateRoute = false;
                this.router.navigate(['/' + AssessmentRouteConstants.AUTH_LOGIN]);
            }
        }
        return activateRoute;
    }
}
