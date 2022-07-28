import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponentViewEnum } from '@app/utility';

@Component({
  selector: 'app-model-improvement-plan-container',
  templateUrl: './model-improvement-plan-container.component.html',
  styleUrls: ['./model-improvement-plan-container.component.scss']
})
export class ModelImprovementPlanContainerComponent implements OnInit, OnDestroy {

  dashboardComponentViewEnum = DashboardComponentViewEnum;
  isShowView = this.dashboardComponentViewEnum.LIST;
  private sub: any;
  modelId;

  constructor(private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.routeSubscribe();
  }

  routeSubscribe = () => {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.modelId = params.modelId;
    });
  }

  onAddImprovementPlan = (view: DashboardComponentViewEnum) => {
    this.isShowView = view;
  }

  onShowList = () => {
    this.isShowView = this.dashboardComponentViewEnum.LIST;
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
