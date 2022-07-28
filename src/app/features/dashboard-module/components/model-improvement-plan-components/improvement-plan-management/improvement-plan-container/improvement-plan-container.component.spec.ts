import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImprovementPlanContainerComponent } from './improvement-plan-container.component';

describe('ImprovementPlanContainerComponent', () => {
  let component: ImprovementPlanContainerComponent;
  let fixture: ComponentFixture<ImprovementPlanContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovementPlanContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementPlanContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
