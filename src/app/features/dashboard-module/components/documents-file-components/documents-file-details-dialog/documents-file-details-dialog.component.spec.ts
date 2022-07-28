import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentsFileDetailsDialogComponent } from './documents-file-details-dialog.component';

describe('DocumentsFileDetailsDialogComponent', () => {
  let component: DocumentsFileDetailsDialogComponent;
  let fixture: ComponentFixture<DocumentsFileDetailsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsFileDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsFileDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
