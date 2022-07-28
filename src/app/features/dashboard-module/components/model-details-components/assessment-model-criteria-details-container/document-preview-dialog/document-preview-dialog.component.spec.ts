import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentPreviewDialogComponent } from './document-preview-dialog.component';

describe('DocumentPreviewDialogComponent', () => {
  let component: DocumentPreviewDialogComponent;
  let fixture: ComponentFixture<DocumentPreviewDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
