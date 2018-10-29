import { TestBed } from '@angular/core/testing';

import { EnhacementService } from './enhacement.service';

describe('EnhacementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnhacementService = TestBed.get(EnhacementService);
    expect(service).toBeTruthy();
  });
});
