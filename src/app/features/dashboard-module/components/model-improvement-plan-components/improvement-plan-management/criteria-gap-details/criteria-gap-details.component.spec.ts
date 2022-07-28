import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaGapDetailsComponent } from './criteria-gap-details.component';

describe('CriteriaGapDetailsComponent', () => {
  let component: CriteriaGapDetailsComponent;
  let fixture: ComponentFixture<CriteriaGapDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaGapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaGapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
