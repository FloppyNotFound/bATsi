import { TestBed } from '@angular/core/testing';
import { TrainWagonsInner } from 'batsi-ng-models';
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
        numPassengerIcons: 2,
        capacityFirstClass: 1,
      },
      {
        numPassengerIcons: 1,
        capacityFirstClass: 1,
      },
    ];
    const filter: TrainWagonFilter = {
      class: 1,
      destination: null,
    };

    // Act
    const result = service.getWagonsOptimized(wagons, filter);

    // Assert
    expect(result?.length).toBe(2);
    expect(result?.[0].numPassengerIcons).toBe(1);
    expect(result?.[1].numPassengerIcons).toBe(2);
  });

  it('should suggest wagon 1, if only wagon 1 is first class and wagon 2 has lower ratio', () => {
    // Assign
    const wagons: TrainWagonsInner[] | undefined = [
      {
        capacityFirstClass: 1,
        numPassengerIcons: 2,
      },
      {
        numPassengerIcons: 1,
      },
    ];
    const filter: TrainWagonFilter = {
      class: 1,
      destination: null,
    };

    // Act
    const result = service.getWagonsOptimized(wagons, filter);

    // Assert
    expect(result?.length).toBe(1);
    expect(result?.[0].numPassengerIcons).toBe(2);
  });
});
