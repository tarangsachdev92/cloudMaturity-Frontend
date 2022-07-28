import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentQuestionnaireDetailsComponent } from './assessment-questionnaire-details.component';

describe('AssessmentQuestionnaireDetailsComponent', () => {
  let component: AssessmentQuestionnaireDetailsComponent;
  let fixture: ComponentFixture<AssessmentQuestionnaireDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentQuestionnaireDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentQuestionnaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
