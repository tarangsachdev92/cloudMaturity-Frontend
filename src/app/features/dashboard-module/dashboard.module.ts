import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDocViewerModule } from "ngx-doc-viewer";

import {
  ModelListComponent,
  ModelLeftNavigationComponent,
  ModelConfigurationComponent,
} from "./components";
import { MaterialModule } from "@app/material";
import { UtilityModule } from "@app/utility";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { PrimeNgModule } from "@app/primeNg";
import { AssessmentService } from "@app/core";
import { ChartsModule } from "ng2-charts";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxEditorModule } from 'ngx-editor';

import {
  AssessmentDetailResolverService,
  AssessmentModelService,
  AssessmentImprovementPlanService,
  CriteriaDetailResolverService,
  ElementService,
  ImprovementPlanDetailResolverService,
  ModelDetailResolverService,
  ModelDocumentService,
  AssessmentQuestionnaireService,
} from "./services";
import { modelAssessmentsComponent } from "./components/model-assessments-components/model-assessments-component.export";
import { modelDetailsComponent } from "./components/model-details-components/model-details-component.export";
import { modelImprovementPlanComponent } from "./components/model-improvement-plan-components/model-improvement-component.export";
import { documentFileComponent } from "./components/documents-file-components/documents-file-model-component.export";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AssessmentScopeComponent } from './components/model-assessments-components/assessment-scope/assessment-scope.component';

@NgModule({
  declarations: [
    ModelListComponent,
    ModelLeftNavigationComponent,
    ModelConfigurationComponent,
    ...modelAssessmentsComponent,
    ...modelDetailsComponent,
    ...modelImprovementPlanComponent,
    ...documentFileComponent,
    AssessmentScopeComponent,
  ],
  imports: [
    CommonModule,
    UtilityModule,
    NgxEditorModule,
    MaterialModule,
    PrimeNgModule,
    NzTreeSelectModule,
    NgxDocViewerModule,
    ChartsModule,
    NgxGaugeModule,
    InfiniteScrollModule,
    DashboardRoutingModule,
  ],
  providers: [
    AssessmentModelService,
    ElementService,
    AssessmentService,
    AssessmentImprovementPlanService,
    ModelDetailResolverService,
    ImprovementPlanDetailResolverService,
    AssessmentDetailResolverService,
    CriteriaDetailResolverService,
    ModelDocumentService,
    AssessmentQuestionnaireService
  ],
  exports: [ModelLeftNavigationComponent],
})
export class DashboardModule { }
