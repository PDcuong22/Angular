import { TestBed } from '@angular/core/testing';

import { CuDanService } from './cu-dan.service';

describe('CuDanService', () => {
  let service: CuDanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuDanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
