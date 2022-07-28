import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddImplementationProcedureDialogComponent } from './add-implementation-procedure-dialog.component';

describe('AddImplementationProcedureDialogComponent', () => {
  let component: AddImplementationProcedureDialogComponent;
  let fixture: ComponentFixture<AddImplementationProcedureDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImplementationProcedureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImplementationProcedureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
