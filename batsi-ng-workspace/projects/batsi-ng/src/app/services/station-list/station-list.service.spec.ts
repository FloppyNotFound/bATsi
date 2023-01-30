import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StationListService } from './station-list.service';

describe('StationListService', () => {
  let service: StationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
