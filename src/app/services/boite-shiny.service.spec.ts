import { TestBed } from '@angular/core/testing';

import { BoiteShinyService } from './boite-shiny.service';

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
