import { TestBed } from '@angular/core/testing';

import { CanHoService } from './can-ho.service';

describe('CanHoService', () => {
  let service: CanHoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanHoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
