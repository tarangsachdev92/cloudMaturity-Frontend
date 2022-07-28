import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAssessmentProcedureDocumentDialogComponent } from './add-assessment-procedure-document-dialog.component';

describe('AddAssessmentProcedureDocumentDialogComponent', () => {
  let component: AddAssessmentProcedureDocumentDialogComponent;
  let fixture: ComponentFixture<AddAssessmentProcedureDocumentDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssessmentProcedureDocumentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssessmentProcedureDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
