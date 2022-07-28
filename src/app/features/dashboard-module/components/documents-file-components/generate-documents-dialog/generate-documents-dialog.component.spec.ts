import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDocumentsDialogComponent } from './generate-documents-dialog.component';

describe('GenerateDocumentsDialogComponent', () => {
  let component: GenerateDocumentsDialogComponent;
  let fixture: ComponentFixture<GenerateDocumentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateDocumentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDocumentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
