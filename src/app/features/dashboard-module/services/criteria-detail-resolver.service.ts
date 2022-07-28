import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { AssignedEnterpriseModel } from '@sharedModule/models';
// import { EnterpriseService } from '@sharedModule/services';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssessmentModelService } from './assessment-model.service';

@Injectable({ providedIn: 'root' })
export class CriteriaDetailResolverService implements Resolve<any> {
    constructor(private assessmentModelService: AssessmentModelService) { }

    resolve(
        route: ActivatedRouteSnapshot
    ):
        | Observable<any>
        | Promise<any>
        | any {
        const criteriaId = route && route.params && route.params.criteriaId;
        if (criteriaId) {
            return this.assessmentModelService.getAssessmentModelCriteria(criteriaId).pipe(
                map((response) => {
                    const criteria = response.payload.criteria as any;
                    return criteria;
                }),
                catchError((error) => {
                    return EMPTY;
                })
            );
        } else {
            return EMPTY;
        }
    }
}