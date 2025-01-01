import { TestBed } from '@angular/core/testing';

import { BoitesPokedexService } from './boites-pokedex.service';

describe('BoitesPokedexService', () => {
  let service: BoitesPokedexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoitesPokedexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
