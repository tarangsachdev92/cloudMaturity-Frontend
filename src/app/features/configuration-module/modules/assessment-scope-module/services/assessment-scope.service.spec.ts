import { TestBed } from '@angular/core/testing';
import { AssessmentTypeService } from './assessment-type.service';

describe('AssessmentTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentTypeService = TestBed.get(AssessmentTypeService);
    expect(service).toBeTruthy();
  });
});
