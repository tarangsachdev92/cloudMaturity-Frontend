import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TargetAndPrioritiesComponent } from './target-and-priorities.component';

describe('TargetAndPrioritiesComponent', () => {
  let component: TargetAndPrioritiesComponent;
  let fixture: ComponentFixture<TargetAndPrioritiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetAndPrioritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAndPrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
