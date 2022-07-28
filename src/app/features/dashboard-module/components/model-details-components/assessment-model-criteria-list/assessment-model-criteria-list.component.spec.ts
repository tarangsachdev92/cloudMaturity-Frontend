import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentModelCriteriaListComponent } from './assessment-model-criteria-list.component';

describe('AssessmentModelCriteriaListComponent', () => {
  let component: AssessmentModelCriteriaListComponent;
  let fixture: ComponentFixture<AssessmentModelCriteriaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentModelCriteriaListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentModelCriteriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
