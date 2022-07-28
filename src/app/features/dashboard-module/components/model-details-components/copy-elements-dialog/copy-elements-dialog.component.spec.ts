import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CopyElementsDialogComponent } from './copy-elements-dialog.component';

describe('CopyElementsDialogComponent', () => {
  let component: CopyElementsDialogComponent;
  let fixture: ComponentFixture<CopyElementsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyElementsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyElementsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
