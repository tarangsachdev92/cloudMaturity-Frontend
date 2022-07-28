import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignAssessmentComponent } from './assign-assessment.component';

describe('AssignAssessmentComponent', () => {
  let component: AssignAssessmentComponent;
  let fixture: ComponentFixture<AssignAssessmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
