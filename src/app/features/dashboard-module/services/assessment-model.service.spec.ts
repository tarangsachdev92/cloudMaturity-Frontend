import { TestBed } from '@angular/core/testing';
import { AssessmentModelService } from './assessment-model.service';

describe('AssessmentModelService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AssessmentModelService = TestBed.get(AssessmentModelService);
        expect(service).toBeTruthy();
    });
});
