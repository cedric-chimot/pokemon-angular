import { TestBed } from '@angular/core/testing';

import { DresseursService } from './dresseurs.service';

describe('DresseursService', () => {
  let service: DresseursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DresseursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
