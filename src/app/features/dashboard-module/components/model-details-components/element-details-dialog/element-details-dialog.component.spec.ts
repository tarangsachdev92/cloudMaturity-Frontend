import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementDetailsDialogComponent } from './element-details-dialog.component';

describe('ElementDetailsDialogComponent', () => {
  let component: ElementDetailsDialogComponent;
  let fixture: ComponentFixture<ElementDetailsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
