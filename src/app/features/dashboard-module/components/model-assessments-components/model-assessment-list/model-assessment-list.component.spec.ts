import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelAssessmentListComponent } from './model-assessment-list.component';

describe('ModelAssessmentListComponent', () => {
  let component: ModelAssessmentListComponent;
  let fixture: ComponentFixture<ModelAssessmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAssessmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
