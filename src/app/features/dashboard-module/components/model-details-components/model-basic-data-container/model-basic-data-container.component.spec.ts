import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelBasicDataContainerComponent } from './model-basic-data-container.component';

describe('ModelBasicDataContainerComponent', () => {
  let component: ModelBasicDataContainerComponent;
  let fixture: ComponentFixture<ModelBasicDataContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBasicDataContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBasicDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
