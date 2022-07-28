import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaSurveyFormComponent } from './criteria-survey-form.component';

describe('CriteriaSurveyFormComponent', () => {
  let component: CriteriaSurveyFormComponent;
  let fixture: ComponentFixture<CriteriaSurveyFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaSurveyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
