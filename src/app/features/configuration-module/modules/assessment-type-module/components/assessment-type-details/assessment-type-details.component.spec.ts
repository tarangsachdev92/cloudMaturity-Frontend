import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentTypeDetailsComponent } from './assessment-type-details.component';

describe('AssessmentTypeDetailsComponent', () => {
  let component: AssessmentTypeDetailsComponent;
  let fixture: ComponentFixture<AssessmentTypeDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
