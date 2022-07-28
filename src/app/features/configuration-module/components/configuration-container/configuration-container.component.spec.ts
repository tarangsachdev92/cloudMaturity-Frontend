import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigurationContainerComponent } from './configuration-container.component';

describe('ConfigurationContainerComponent', () => {
  let component: ConfigurationContainerComponent;
  let fixture: ComponentFixture<ConfigurationContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
