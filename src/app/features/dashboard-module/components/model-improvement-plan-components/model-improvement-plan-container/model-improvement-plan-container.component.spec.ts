import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelImprovementPlanContainerComponent } from './model-improvement-plan-container.component';

describe('ModelImprovementPlanContainerComponent', () => {
  let component: ModelImprovementPlanContainerComponent;
  let fixture: ComponentFixture<ModelImprovementPlanContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelImprovementPlanContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelImprovementPlanContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
