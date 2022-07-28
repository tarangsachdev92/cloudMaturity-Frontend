import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaturityLevelSchemaDetailsComponent } from './maturity-level-schema-details.component';

describe('MaturityLevelSchemaDetailsComponent', () => {
  let component: MaturityLevelSchemaDetailsComponent;
  let fixture: ComponentFixture<MaturityLevelSchemaDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityLevelSchemaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityLevelSchemaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
