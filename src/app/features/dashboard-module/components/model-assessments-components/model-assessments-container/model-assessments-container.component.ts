import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core';
import { AssessmentModelService } from '@app/features/dashboard-module/services';
import { DashboardComponentViewEnum } from '@app/utility';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-model-assessments-container',
  templateUrl: './model-assessments-container.component.html',
  styleUrls: ['./model-assessments-container.component.scss']
})
export class ModelAssessmentsContainerComponent implements OnInit, OnDestroy {

  dashboardComponentViewEnum = DashboardComponentViewEnum;
  isShowView = this.dashboardComponentViewEnum.LIST;
  private sub: any;
  modelId;
  modelDetail;
  assessmentTypes = [];
  users = [];
  isLoaderAssessmentRelatedData = false;

  constructor(private activatedRoute: ActivatedRoute,
    private assessmentModelService: AssessmentModelService,
    private _commonService: CommonService) { }

  ngOnInit() {
    this.modelId = this.activatedRoute.snapshot.params.modelId;
    this.bindAssessmentRelatedData();
  }
  bindAssessmentRelatedData = () => {
    this.isLoaderAssessmentRelatedData = true;
    this.isLoaderAssessmentRelatedData = true;
    this.getAssessmentRelatedData().subscribe((response) => {
      this.users = response[0].payload.data || [];
      this.assessmentTypes = response[1].payload.data || [];
      this.modelDetail = response[2] && response[2].payload.model;
      this.isLoaderAssessmentRelatedData = false;
    }, error => {
      this.isLoaderAssessmentRelatedData = false;
    });
  }

  getAssessmentRelatedData = () => {
    const observables = [
      this.getUsers(),
      this.getAssessmentTypes(),
    ];
    if (this.modelId) {
      observables.push(this.getAssessmentModel(this.modelId))
    }
    return forkJoin(observables);
  }

  getAssessmentModel = (id) => {
    return this.assessmentModelService.getAssessmentModelElementDetail(id);
  }

  getAssessmentTypes = (): Observable<any> => {
    return this._commonService.getAssessmentTypes();
  }

  getUsers = () => {
    // TODO remove page:1 as a required field from the api
    const params = { page: 1, recordsPerPage: 999999 };
    return this._commonService.getUserList(params);
  };

  onAddAssessment = (view: DashboardComponentViewEnum) => {
    this.isShowView = view;
  }

  onShowAssessmentList = () => {
    this.isShowView = this.dashboardComponentViewEnum.LIST;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
