import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserAuthLoginContainerComponent } from './user-auth-login-container.component';

describe('UserAuthLoginContainerComponent', () => {
  let component: UserAuthLoginContainerComponent;
  let fixture: ComponentFixture<UserAuthLoginContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthLoginContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthLoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
