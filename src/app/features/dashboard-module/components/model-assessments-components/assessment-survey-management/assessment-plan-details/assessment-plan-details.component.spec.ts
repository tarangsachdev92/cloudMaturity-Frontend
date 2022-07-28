import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentPlanDetailsComponent } from './assessment-plan-details.component';

describe('AssessmentPlanDetailsComponent', () => {
  let component: AssessmentPlanDetailsComponent;
  let fixture: ComponentFixture<AssessmentPlanDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentPlanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
