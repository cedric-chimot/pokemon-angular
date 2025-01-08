import { TestBed } from '@angular/core/testing';

import { BoiteShinyService } from './pokemon-shiny.service';

describe('BoiteShinyService', () => {
  let service: BoiteShinyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoiteShinyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
