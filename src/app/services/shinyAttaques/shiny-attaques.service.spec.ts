import { TestBed } from '@angular/core/testing';

import { ShinyAttaquesService } from './shiny-attaques.service';

describe('ShinyAttaquesService', () => {
  let service: ShinyAttaquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinyAttaquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
