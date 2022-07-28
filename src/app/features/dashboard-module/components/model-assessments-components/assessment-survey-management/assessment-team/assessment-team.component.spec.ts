import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentTeamComponent } from './assessment-team.component';

describe('AssessmentTeamComponent', () => {
  let component: AssessmentTeamComponent;
  let fixture: ComponentFixture<AssessmentTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
