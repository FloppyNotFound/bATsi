import { TestBed } from '@angular/core/testing';

import { StationNumberService } from './station-number.service';

describe('StationNumberService', () => {
  let service: StationNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
