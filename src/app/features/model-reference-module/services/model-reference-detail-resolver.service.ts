import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonService } from '@app/core';
import { AssessmentRouteConstants } from '@app/utility';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModelReferenceDetailResolverService implements Resolve<any> {
    constructor(private commonService: CommonService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): | Observable<any> | Promise<any> | any {
        const modelId = route && route.firstChild && route.firstChild.params && route.firstChild.params.modelId;
        if (modelId) {
            return this.commonService.getAssessmentModelElementDetail(modelId).pipe(
                map((response) => {
                    const model = response.payload.model as any;
                    return model;
                }),
                catchError((error) => {
                    this.router.navigate([`/${AssessmentRouteConstants.MODEL_REFERENCE_MODULE}`]);
                    return {} as any
                })
            );
        } else {
            return {};
        }
    }
}