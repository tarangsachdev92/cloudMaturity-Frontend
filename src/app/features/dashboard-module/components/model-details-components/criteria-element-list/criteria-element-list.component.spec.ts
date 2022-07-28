import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaElementListComponent } from './criteria-element-list.component';

describe('CriteriaElementListComponent', () => {
  let component: CriteriaElementListComponent;
  let fixture: ComponentFixture<CriteriaElementListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaElementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
