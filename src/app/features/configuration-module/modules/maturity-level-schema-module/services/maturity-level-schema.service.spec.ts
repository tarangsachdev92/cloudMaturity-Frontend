import { TestBed } from '@angular/core/testing';
import { MaturityLevelSchemaService } from './maturity-level-schema.service';

describe('MaturityLevelSchemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaturityLevelSchemaService = TestBed.get(MaturityLevelSchemaService);
    expect(service).toBeTruthy();
  });
});
