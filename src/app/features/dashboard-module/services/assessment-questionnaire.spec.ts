import { TestBed } from '@angular/core/testing';
import { AssessmentQuestionnaireService } from './assessment-questionnaire.service';

describe('AssessmentQuestionnaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentQuestionnaireService = TestBed.get(AssessmentQuestionnaireService);
    expect(service).toBeTruthy();
  });
});
