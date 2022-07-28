import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentModelCriteriaDetailsComponent } from './assessment-model-criteria-details.component';

describe('AssessmentModelCriteriaDetailsComponent', () => {
  let component: AssessmentModelCriteriaDetailsComponent;
  let fixture: ComponentFixture<AssessmentModelCriteriaDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentModelCriteriaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentModelCriteriaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
