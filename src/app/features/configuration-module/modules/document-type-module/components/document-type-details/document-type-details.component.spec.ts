import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentTypeDetailsComponent } from './document-type-details.component';

describe('DocumentTypeDetailsComponent', () => {
  let component: DocumentTypeDetailsComponent;
  let fixture: ComponentFixture<DocumentTypeDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
