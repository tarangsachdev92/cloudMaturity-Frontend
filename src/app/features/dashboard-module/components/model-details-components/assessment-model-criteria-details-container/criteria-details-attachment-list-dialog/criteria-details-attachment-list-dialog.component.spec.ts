import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaDetailsAttachmentListDialogComponent } from './criteria-details-attachment-list-dialog.component';

describe('CriteriaDetailsAttachmentListDialogComponent', () => {
  let component: CriteriaDetailsAttachmentListDialogComponent;
  let fixture: ComponentFixture<CriteriaDetailsAttachmentListDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaDetailsAttachmentListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaDetailsAttachmentListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
