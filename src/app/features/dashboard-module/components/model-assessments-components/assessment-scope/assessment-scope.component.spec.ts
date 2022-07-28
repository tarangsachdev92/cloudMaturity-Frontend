import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentScopeComponent } from './assessment-scope.component';

describe('AssessmentScopeComponent', () => {
  let component: AssessmentScopeComponent;
  let fixture: ComponentFixture<AssessmentScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentScopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
