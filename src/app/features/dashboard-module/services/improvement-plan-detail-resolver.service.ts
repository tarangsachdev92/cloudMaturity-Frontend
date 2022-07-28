import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssessmentImprovementPlanService } from './assessment-improvement-plan.service';

@Injectable({ providedIn: 'root' })
export class ImprovementPlanDetailResolverService implements Resolve<any> {
    constructor(
        private router: Router,
        private assessmentImprovementPlanService: AssessmentImprovementPlanService
    ) { }

    getImprovementPlan = (improvementPlanId): Observable<any> => {
        return this.assessmentImprovementPlanService.getImprovementPlan(improvementPlanId);
    }

    resolve(
        route: ActivatedRouteSnapshot
    ):
        | Observable<any>
        | Promise<any>
        | any {
        const improvementPlanId = route && route.params && route.params.improvementPlanId;
        const modelId = route && route.params && route.params.modelId;
        if (improvementPlanId) {
            return this.getImprovementPlan(improvementPlanId).pipe(
                map((response) => {
                    const improvementPlan = response.payload.improvementPlan as any;
                    return improvementPlan;
                }),
                catchError((error) => {
                    this.router.navigate([`/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLANS}`.replace(':modelId', modelId)])
                    return EMPTY;
                })
            );
        } else {
            return EMPTY;
        }
    }
}