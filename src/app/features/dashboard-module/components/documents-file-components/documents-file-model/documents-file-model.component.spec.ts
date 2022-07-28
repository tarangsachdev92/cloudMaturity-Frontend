import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentsFileModelComponent } from './documents-file-model.component';

describe('DocumentsFileModelComponent', () => {
  let component: DocumentsFileModelComponent;
  let fixture: ComponentFixture<DocumentsFileModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsFileModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsFileModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
