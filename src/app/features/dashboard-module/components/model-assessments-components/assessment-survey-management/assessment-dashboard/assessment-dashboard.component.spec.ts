import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentDashboardComponent } from './assessment-dashboard.component';

describe('AssessmentDashboardComponent', () => {
  let component: AssessmentDashboardComponent;
  let fixture: ComponentFixture<AssessmentDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
