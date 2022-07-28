import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaListSurveyComponent } from './criteria-list-survey.component';

describe('CriteriaListSurveyComponent', () => {
  let component: CriteriaListSurveyComponent;
  let fixture: ComponentFixture<CriteriaListSurveyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaListSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaListSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
