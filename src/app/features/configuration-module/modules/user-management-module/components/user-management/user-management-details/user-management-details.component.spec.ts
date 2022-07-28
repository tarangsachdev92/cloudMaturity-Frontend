import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserManagementDetailsComponent } from './user-management-details.component';

describe('UserManagementDetailsComponent', () => {
  let component: UserManagementDetailsComponent;
  let fixture: ComponentFixture<UserManagementDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
