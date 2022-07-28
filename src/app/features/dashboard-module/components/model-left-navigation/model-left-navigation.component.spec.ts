import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelLeftNavigationComponent } from './model-left-navigation.component';

describe('ModelLeftNavigationComponent', () => {
  let component: ModelLeftNavigationComponent;
  let fixture: ComponentFixture<ModelLeftNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeftNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeftNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
