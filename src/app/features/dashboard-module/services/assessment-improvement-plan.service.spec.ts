import { TestBed } from "@angular/core/testing";
import { AssessmentImprovementPlanService } from "./assessment-improvement-plan.service";

describe("AssessmentImprovementPlanService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AssessmentImprovementPlanService = TestBed.get(AssessmentImprovementPlanService);
    expect(service).toBeTruthy();
  });
});
