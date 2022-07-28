import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelReferenceConfigurationComponent } from './model-reference-configuration.component';

describe('ModelReferenceConfigurationComponent', () => {
  let component: ModelReferenceConfigurationComponent;
  let fixture: ComponentFixture<ModelReferenceConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModelReferenceConfigurationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelReferenceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
