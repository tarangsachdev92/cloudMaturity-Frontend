import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CriteriaSubElementListSurveyComponent } from './criteria-sub-element-list-survey.component';


describe('CriteriaSubElementListSurveyComponent', () => {
  let component: CriteriaSubElementListSurveyComponent;
  let fixture: ComponentFixture<CriteriaSubElementListSurveyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaSubElementListSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaSubElementListSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
