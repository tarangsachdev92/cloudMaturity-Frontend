import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AssessmentRouteConstants, UserRole } from '@app/utility';
import { SharedService } from '../services';
// above import (SharedService from ../services) is intentionally to avoid circular depedencies

@Injectable()
export class RoleGurad implements CanActivate {
    constructor(private router: Router, private _sharedService: SharedService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userRole = this._sharedService.getUserRole()
        if (userRole) {
            if (route.data.roles && route.data.roles.indexOf(+userRole) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/' + AssessmentRouteConstants.PROFILE]);
                return false;
            }
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/' + AssessmentRouteConstants.AUTH_LOGIN]);
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }
}
