import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubElementDetailsDialogComponent } from './sub-element-details-dialog.component';

describe('SubElementDetailsDialogComponent', () => {
  let component: SubElementDetailsDialogComponent;
  let fixture: ComponentFixture<SubElementDetailsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubElementDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubElementDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
