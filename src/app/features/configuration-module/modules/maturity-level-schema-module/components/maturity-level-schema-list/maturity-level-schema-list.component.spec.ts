import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaturityLevelSchemaListComponent } from './maturity-level-schema-list.component';

describe('MaturityLevelShemaListComponent', () => {
  let component: MaturityLevelSchemaListComponent;
  let fixture: ComponentFixture<MaturityLevelSchemaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityLevelSchemaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityLevelSchemaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
