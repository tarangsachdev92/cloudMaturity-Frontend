import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SurveyBasicDetailsComponent } from './survey-basic-details.component';

describe('SurveyBasicDetailsComponent', () => {
  let component: SurveyBasicDetailsComponent;
  let fixture: ComponentFixture<SurveyBasicDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
