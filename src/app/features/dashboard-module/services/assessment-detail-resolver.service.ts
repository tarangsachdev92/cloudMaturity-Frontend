import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AssessmentService } from '@app/core';
import { AssessmentRouteConstants } from '@app/utility';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AssessmentDetailResolverService implements Resolve<any> {
    constructor(private assessmentService: AssessmentService, private router: Router) { }
    getAssessmentDetail = (assessmentId) => {
        return this.assessmentService.getAssessmentDetail(assessmentId);
    };
    resolve(
        route: ActivatedRouteSnapshot
    ):
        | Observable<any>
        | Promise<any>
        | any {
        const assessmentId = route && route.params && route.params.assessmentId;
        const modelId = route && route.params && route.params.modelId;
        if (assessmentId) {
            return this.getAssessmentDetail(assessmentId).pipe(
                map((response) => {
                    const assessment = response.payload.data as any;
                    return assessment;
                }),
                catchError((error) => {
                    this.router.navigate([`/${AssessmentRouteConstants.MODEL_ASSESSMENTS}`
                        .replace(':modelId', modelId)]);
                    return EMPTY;
                })
            );
        } else {
            return EMPTY;
        }
    }
}