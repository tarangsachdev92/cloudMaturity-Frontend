import { ActionPlanComponent } from "./improvement-plan-management/action-plan/action-plan.component";
import { AddActionPlanDialogComponent } from "./improvement-plan-management/add-action-plan-dialog/add-action-plan-dialog.component";
import { AssignAssessmentComponent } from "./improvement-plan-management/assign-assessment/assign-assessment.component";
import { CreateAssessmentDialogComponent } from "./improvement-plan-management/create-assessment-dialog/create-assessment-dialog.component";
import { CriteriaGapDetailsComponent } from "./improvement-plan-management/criteria-gap-details/criteria-gap-details.component";
import { GapAnalysisComponent } from "./improvement-plan-management/gap-analysis/gap-analysis.component";
import { ImprovementPlanContainerComponent } from "./improvement-plan-management/improvement-plan-container/improvement-plan-container.component";
import { ImprovementPlanComponent } from "./improvement-plan-management/improvement-plan/improvement-plan.component";
import { TargetAndPrioritiesComponent } from "./improvement-plan-management/target-and-priorities/target-and-priorities.component";
import { ModelImprovementListComponent } from "./model-improvement-list/model-improvement-list.component";
import { ModelImprovementPlanContainerComponent } from "./model-improvement-plan-container/model-improvement-plan-container.component";
import { ModelImprovementPlanDetailsComponent } from "./model-improvement-plan-details/model-improvement-plan-details.component";

export const modelImprovementPlanComponent = [
  ModelImprovementPlanContainerComponent,
  ModelImprovementListComponent,
  ModelImprovementPlanDetailsComponent,
  ActionPlanComponent,
  AddActionPlanDialogComponent,
  AssignAssessmentComponent,
  CreateAssessmentDialogComponent,
  CriteriaGapDetailsComponent,
  GapAnalysisComponent,
  ImprovementPlanComponent,
  ImprovementPlanContainerComponent,
  TargetAndPrioritiesComponent,
];
