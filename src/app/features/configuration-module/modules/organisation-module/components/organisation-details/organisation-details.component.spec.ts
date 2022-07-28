import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationDetailsComponent } from './organisation-details.component';

describe('OrganisationDetailsComponen', () => {
  let component: OrganisationDetailsComponent;
  let fixture: ComponentFixture<OrganisationDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
