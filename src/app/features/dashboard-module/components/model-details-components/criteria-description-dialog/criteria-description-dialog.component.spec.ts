import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaDescriptionDialogComponent } from './criteria-description-dialog.component';

describe('CriteriaDescriptionDialogComponent', () => {
  let component: CriteriaDescriptionDialogComponent;
  let fixture: ComponentFixture<CriteriaDescriptionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaDescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
