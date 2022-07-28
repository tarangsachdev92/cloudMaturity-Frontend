import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigurationLeftNavigationComponent } from './configuration-left-navigation.component';

describe('ConfigurationLeftNavigationComponent', () => {
  let component: ConfigurationLeftNavigationComponent;
  let fixture: ComponentFixture<ConfigurationLeftNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationLeftNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationLeftNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
