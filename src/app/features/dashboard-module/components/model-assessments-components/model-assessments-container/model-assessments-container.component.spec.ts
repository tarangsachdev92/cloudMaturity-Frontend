import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelAssessmentsContainerComponent } from './model-assessments-container.component';

describe('ModelAssessmentsContainerComponent', () => {
  let component: ModelAssessmentsContainerComponent;
  let fixture: ComponentFixture<ModelAssessmentsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAssessmentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAssessmentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
