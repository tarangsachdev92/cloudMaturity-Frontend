import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';

@Component({
  selector: 'app-model-reference-left-navigation',
  templateUrl: './model-reference-left-navigation.component.html',
  styleUrls: ['./model-reference-left-navigation.component.scss']
})
export class ModelReferenceLeftNavigationComponent implements OnInit, OnDestroy {
  private sub: any;
  modelId;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routeSubscribe();
  }

  routeSubscribe = () => {
    this.sub = this.activatedRoute.firstChild.params.subscribe(params => {
      this.modelId = params['modelId'];
    });
  };

  get modelDetailsUrl() {
    return `/${AssessmentRouteConstants.MODEL_REFERENCE_DETAILS}/${this.modelId}`;
  }

  onClickModelDetails = () => {
    this.router.navigateByUrl(this.modelDetailsUrl);
  }

  get isModelRelatedRoutes() {
    const params = this.activatedRoute.firstChild.snapshot.params;
    const modelId = params['modelId'];
    const criteriaId = params['criteriaId'];
    const modelRelatedRoutes = [
      `/model-reference/model/${modelId}`,
      `/model-reference/model/${modelId}/criteria/${criteriaId}`
    ]
    return modelRelatedRoutes.includes(this.router.url);
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe() };
  }
}
