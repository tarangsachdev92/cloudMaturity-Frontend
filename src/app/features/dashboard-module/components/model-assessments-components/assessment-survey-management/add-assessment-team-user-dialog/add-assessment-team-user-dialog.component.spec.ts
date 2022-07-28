import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAssessmentTeamUserDialogComponent } from './add-assessment-team-user-dialog.component';

describe('AddAssessmentTeamUserDialogComponent', () => {
  let component: AddAssessmentTeamUserDialogComponent;
  let fixture: ComponentFixture<AddAssessmentTeamUserDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssessmentTeamUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssessmentTeamUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
