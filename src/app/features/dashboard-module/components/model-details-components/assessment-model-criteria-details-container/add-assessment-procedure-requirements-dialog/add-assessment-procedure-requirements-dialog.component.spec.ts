import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAssessmentProcedureRequirementsDialogComponent } from './add-assessment-procedure-requirements-dialog.component';

describe('AddAssessmentProcedureRequirementsDialogComponent', () => {
  let component: AddAssessmentProcedureRequirementsDialogComponent;
  let fixture: ComponentFixture<AddAssessmentProcedureRequirementsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssessmentProcedureRequirementsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssessmentProcedureRequirementsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
