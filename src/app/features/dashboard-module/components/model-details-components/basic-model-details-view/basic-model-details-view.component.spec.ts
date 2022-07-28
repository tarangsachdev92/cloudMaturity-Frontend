import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicModelDetailsViewComponent } from './basic-model-details-view.component';

describe('BasicModelDetailsViewComponent', () => {
  let component: BasicModelDetailsViewComponent;
  let fixture: ComponentFixture<BasicModelDetailsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicModelDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicModelDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
