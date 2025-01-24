import { TestBed } from '@angular/core/testing';

import { RegionsDresseurService } from './regions-dresseur.service';

describe('RegionsDresseurService', () => {
  let service: RegionsDresseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionsDresseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
