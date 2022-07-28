import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSubOrganisationDialogComponent } from './add-sub-organisation-dialog.component';

describe('AddSubOrganisationDialogComponent', () => {
  let component: AddSubOrganisationDialogComponent;
  let fixture: ComponentFixture<AddSubOrganisationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubOrganisationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubOrganisationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
