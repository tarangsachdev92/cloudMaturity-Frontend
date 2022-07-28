import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentScopeListComponent } from './assessment-scope-list.component';

describe('AssessmentScopeListComponent', () => {
  let component: AssessmentScopeListComponent;
  let fixture: ComponentFixture<AssessmentScopeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentScopeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentScopeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
