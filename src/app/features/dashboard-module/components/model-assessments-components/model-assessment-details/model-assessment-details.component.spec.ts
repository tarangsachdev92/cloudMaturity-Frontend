import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelAssessmentDetailsComponent } from './model-assessment-details.component';

describe('ModelAssessmentDetailsComponent', () => {
  let component: ModelAssessmentDetailsComponent;
  let fixture: ComponentFixture<ModelAssessmentDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAssessmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
