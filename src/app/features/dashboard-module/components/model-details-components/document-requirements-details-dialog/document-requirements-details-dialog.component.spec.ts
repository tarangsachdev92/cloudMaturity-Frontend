import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DocumentRequirementsDetailsDialogComponent } from './document-requirements-details-dialog.component';


describe('DocumentRequirementsDetailsDialogComponent', () => {
  let component: DocumentRequirementsDetailsDialogComponent;
  let fixture: ComponentFixture<DocumentRequirementsDetailsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRequirementsDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRequirementsDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
