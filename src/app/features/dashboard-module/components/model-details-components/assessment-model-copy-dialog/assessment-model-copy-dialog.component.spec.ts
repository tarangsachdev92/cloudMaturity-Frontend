import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentModelCopyDialogComponent } from './assessment-model-copy-dialog.component';

describe('AssessmentModelCopyDialogComponent', () => {
  let component: AssessmentModelCopyDialogComponent;
  let fixture: ComponentFixture<AssessmentModelCopyDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentModelCopyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentModelCopyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
