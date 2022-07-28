import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaAttachmentDetailsDialogComponent } from './criteria-attachment-details-dialog.component';

describe('CriteriaAttachmentDetailsDialogComponent', () => {
  let component: CriteriaAttachmentDetailsDialogComponent;
  let fixture: ComponentFixture<CriteriaAttachmentDetailsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaAttachmentDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaAttachmentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
