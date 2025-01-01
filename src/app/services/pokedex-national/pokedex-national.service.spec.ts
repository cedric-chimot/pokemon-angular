import { TestBed } from '@angular/core/testing';

import { PokedexNationalService } from './pokedex-national.service';

describe('PokedexNationalService', () => {
  let service: PokedexNationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexNationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
