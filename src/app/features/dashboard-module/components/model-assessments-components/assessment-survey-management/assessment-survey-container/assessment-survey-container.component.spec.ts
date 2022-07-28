import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentSurveyContainerComponent } from './assessment-survey-container.component';

describe('AssessmentSurveyContainerComponent', () => {
  let component: AssessmentSurveyContainerComponent;
  let fixture: ComponentFixture<AssessmentSurveyContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentSurveyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentSurveyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
