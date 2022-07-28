import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivateModelRulesDialogComponent } from './activate-model-rules-dialog.component';

describe('ActivateModelRulesDialogComponent', () => {
  let component: ActivateModelRulesDialogComponent;
  let fixture: ComponentFixture<ActivateModelRulesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateModelRulesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateModelRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
