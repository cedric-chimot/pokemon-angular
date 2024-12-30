import { TestBed } from '@angular/core/testing';

import { AttaquesService } from './attaques.service';

describe('AttaquesService', () => {
  let service: AttaquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttaquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
