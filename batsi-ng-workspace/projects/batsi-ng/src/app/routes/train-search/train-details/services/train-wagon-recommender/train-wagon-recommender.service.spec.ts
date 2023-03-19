import { TestBed } from '@angular/core/testing';
import { LoadStatsInner, TrainWagonsInner } from 'batsi-models';
import { TrainWagonFilter } from '../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

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

  it('should suggest wagon 2, then wagon 1, if both are first class and wagon 2 has lower ratio', () => {
    // Assign
    const wagons: TrainWagonsInner[] | undefined = [
      {
        ranking: 1,
        capacityFirstClass: 10
      },
      {
        ranking: 2,
        capacityFirstClass: 10
      }
    ];
    const filter: TrainWagonFilter = {
      class: 1
    };
    const stats: LoadStatsInner[] | undefined = [
      {
        ranking: 1,
        ratio: 70
      },
      {
        ranking: 2,
        ratio: 50
      }
    ];

    // Act
    const result = service.getWagonsOptimized(wagons, filter, stats);

    // Assert
    expect(result?.length).toBe(2);
    expect(result?.[0].ranking).toBe(2);
    expect(result?.[1].ranking).toBe(1);
  });

  it('should suggest Wagon 1, if only wagon 1 is first class and wagon 2 has lower ratio', () => {
    // Assign
    const wagons: TrainWagonsInner[] | undefined = [
      {
        ranking: 1,
        capacityFirstClass: 10
      },
      {
        ranking: 2
      }
    ];
    const filter: TrainWagonFilter = {
      class: 1
    };
    const stats: LoadStatsInner[] | undefined = [
      {
        ranking: 1,
        ratio: 70
      },
      {
        ranking: 2,
        ratio: 50
      }
    ];

    // Act
    const result = service.getWagonsOptimized(wagons, filter, stats);

    // Assert
    expect(result?.length).toBe(1);
    expect(result?.[0].ranking).toBe(1);
  });
});
