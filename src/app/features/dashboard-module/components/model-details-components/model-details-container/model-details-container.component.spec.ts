import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelDetailsContainerComponent } from './model-details-container.component';

describe('ModelDetailsContainerComponent', () => {
  let component: ModelDetailsContainerComponent;
  let fixture: ComponentFixture<ModelDetailsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
