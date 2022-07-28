import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentRequirementsComponent } from './document-requirements.component';

describe('DocumentRequirementsComponent', () => {
  let component: DocumentRequirementsComponent;
  let fixture: ComponentFixture<DocumentRequirementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
