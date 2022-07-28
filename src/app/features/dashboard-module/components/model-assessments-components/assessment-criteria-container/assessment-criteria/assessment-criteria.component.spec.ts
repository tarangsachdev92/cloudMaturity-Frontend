import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentCriteriaComponent } from './assessment-criteria.component';

describe('AssessmentCriteriaComponent', () => {
  let component: AssessmentCriteriaComponent;
  let fixture: ComponentFixture<AssessmentCriteriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
