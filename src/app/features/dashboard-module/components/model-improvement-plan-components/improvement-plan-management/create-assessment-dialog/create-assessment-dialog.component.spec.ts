import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateAssessmentDialogComponent } from './create-assessment-dialog.component';

describe('CreateAssessmentDialogComponent', () => {
  let component: CreateAssessmentDialogComponent;
  let fixture: ComponentFixture<CreateAssessmentDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssessmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssessmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
