import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelImprovementListComponent } from './model-improvement-list.component';

describe('ModelImprovementListComponent', () => {
  let component: ModelImprovementListComponent;
  let fixture: ComponentFixture<ModelImprovementListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelImprovementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelImprovementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
