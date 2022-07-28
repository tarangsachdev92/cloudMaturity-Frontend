import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelImprovementPlanDetailsComponent } from './model-improvement-plan-details.component';

describe('ModelImprovementPlanDetailsComponent', () => {
  let component: ModelImprovementPlanDetailsComponent;
  let fixture: ComponentFixture<ModelImprovementPlanDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelImprovementPlanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelImprovementPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
