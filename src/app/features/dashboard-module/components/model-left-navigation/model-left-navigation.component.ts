import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-model-left-navigation',
  templateUrl: './model-left-navigation.component.html',
  styleUrls: ['./model-left-navigation.component.scss']
})
export class ModelLeftNavigationComponent implements OnInit, OnDestroy {
  private sub: any;
  modelId;
  criteriaId;
  assessmentId;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.routeSubscribe();
  }

  routeSubscribe = () => {
    this.sub = this.activatedRoute.firstChild.params.subscribe(params => {
      this.modelId = params['modelId'];
      this.criteriaId = params['criteriaId'];
      this.assessmentId = params['assessmentId'];
    });
  };

  get modelDetailsUrl() {
    return `/${AssessmentRouteConstants.MODEL_DETAILS}/${this.modelId}`;
  }

  get assessmentDetailsUrl() {
    return `/${AssessmentRouteConstants.MODEL_ASSESSMENTS}`.replace(':modelId', this.modelId);
  }

  get improvementPlanDetailsUrl() {
    return `/${AssessmentRouteConstants.MODEL_IMPROVEMENT_PLANS}`.replace(':modelId', this.modelId);
  }

  get documentsUrl() {
    return `/${AssessmentRouteConstants.DOCUMENTS_MODEL}`.replace(':modelId', this.modelId);
  }

  onClickModelDetails = () => {
    this.router.navigateByUrl(this.modelDetailsUrl);
  }

  onClickAssessments = () => {
    this.router.navigateByUrl(this.assessmentDetailsUrl);
  }

  onClickImprovementPlan = () => {
    this.router.navigateByUrl(this.improvementPlanDetailsUrl);
  }

  onClickDocuments = () => {
    this.router.navigateByUrl(this.documentsUrl);
  }

  get isModelRelatedRoutes() {
    const params = this.activatedRoute.firstChild.snapshot.params;
    const modelId = params['modelId'];
    const criteriaId = params['criteriaId'];
    const modelRelatedRoutes = [
      `/dashboard/model/${modelId}`,
      `/dashboard/model/${modelId}/criteria/${criteriaId}`
    ]
    return modelRelatedRoutes.includes(this.router.url);
  }

  get isAssessmentRelatedRoute() {
    const params = this.activatedRoute.firstChild.snapshot.params;
    const modelId = params['modelId'];
    const assessmentId = params['assessmentId'];
    const planId = params['planId'];
    const assessmentRelatedRoutes = [
      `/dashboard/model/${modelId}/assessments`,
      `/dashboard/model/${modelId}/assessments/${assessmentId}`,
      `/dashboard/model/${modelId}/assessments/${assessmentId}/plan/${planId}`
    ]
    return assessmentRelatedRoutes.includes(this.router.url);
  }

  get isImprovementRelatedRoute() {
    const params = this.activatedRoute.firstChild.snapshot.params;
    const modelId = params['modelId'];
    const improvementPlanId = params['improvementPlanId'];
    const improvementRelatedRoutes = [
      `/dashboard/model/${modelId}/improvement-plans`,
      `/dashboard/model/${modelId}/improvement-plans/${improvementPlanId}`
    ]
    return improvementRelatedRoutes.includes(this.router.url);
  }

  get isDocumentRelatedRoute() {
    const params = this.activatedRoute.firstChild.snapshot.params;
    const modelId = params['modelId'];
    const documentsRoute = [
      `/dashboard/model/${modelId}/documents`,
    ]
    return documentsRoute.includes(this.router.url);
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe() };
  }
}
