import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentScopeDetailsComponent } from './assessment-scope-details.component';

describe('AssessmentScopeDetailsComponent', () => {
  let component: AssessmentScopeDetailsComponent;
  let fixture: ComponentFixture<AssessmentScopeDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentScopeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentScopeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
