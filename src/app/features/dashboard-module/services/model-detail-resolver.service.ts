import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssessmentModelService } from './assessment-model.service';

@Injectable({ providedIn: 'root' })
export class ModelDetailResolverService implements Resolve<any> {
    constructor(private assessmentModelService: AssessmentModelService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): | Observable<any> | Promise<any> | any {
        const modelId = route && route.firstChild && route.firstChild.params && route.firstChild.params.modelId;
        if (modelId) {
            return this.assessmentModelService.getAssessmentModelElementDetail(modelId).pipe(
                map((response) => {
                    const model = response.payload.model as any;
                    return model;
                }),
                catchError((error) => {
                    this.router.navigate([`/${AssessmentRouteConstants.DASHBOARD_MODULE}`]);
                    return {} as any
                })
            );
        } else {
            return {};
        }
    }
}