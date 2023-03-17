import { TestBed } from '@angular/core/testing';

import { TrainWagonRecommenderService } from './train-wagon-recommender.service';

describe('TrainWagonRecommenderService', () => {
  let service: TrainWagonRecommenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainWagonRecommenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
