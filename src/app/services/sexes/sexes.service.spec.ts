import { TestBed } from '@angular/core/testing';

import { SexesService } from './sexes.service';

describe('SexesService', () => {
  let service: SexesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
