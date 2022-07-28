import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PartnerDetailsComponent } from './partner-details.component';

describe('PartnerDetailsComponent', () => {
  let component: PartnerDetailsComponent;
  let fixture: ComponentFixture<PartnerDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
