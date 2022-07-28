import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelReferenceListComponent } from './model-reference-list.component';

describe('ModelReferenceListComponent', () => {
  let component: ModelReferenceListComponent;
  let fixture: ComponentFixture<ModelReferenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelReferenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelReferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
