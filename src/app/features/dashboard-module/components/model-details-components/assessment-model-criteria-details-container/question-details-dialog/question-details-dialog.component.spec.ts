import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionDetailsDialogComponent } from './question-details-dialog.component';

describe('QuestionDetailsDialogComponent', () => {
  let component: QuestionDetailsDialogComponent;
  let fixture: ComponentFixture<QuestionDetailsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
