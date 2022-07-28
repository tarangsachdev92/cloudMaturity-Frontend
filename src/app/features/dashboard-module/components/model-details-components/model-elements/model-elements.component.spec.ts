import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelElementsComponent } from './model-elements.component';

describe('ModelElementsComponent', () => {
  let component: ModelElementsComponent;
  let fixture: ComponentFixture<ModelElementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
