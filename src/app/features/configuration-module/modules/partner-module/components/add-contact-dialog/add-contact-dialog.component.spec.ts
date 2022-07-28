import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddContactDialogComponent } from './add-contact-dialog.component';

describe('AddContactDialogComponent', () => {
  let component: AddContactDialogComponent;
  let fixture: ComponentFixture<AddContactDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
