import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentTypeListComponent } from './assessment-type-list.component';

describe('AssessmentTypeListComponent', () => {
  let component: AssessmentTypeListComponent;
  let fixture: ComponentFixture<AssessmentTypeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
