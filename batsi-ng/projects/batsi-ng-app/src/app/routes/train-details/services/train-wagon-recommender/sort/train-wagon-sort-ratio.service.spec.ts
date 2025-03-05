import { TestBed } from '@angular/core/testing';
import { TrainWagonSortRatioService } from './train-wagon-sort-ratio.service';
import { TrainWagonsInner } from 'batsi-ng-models';

describe('TrainWagonSortRatioService', () => {
  let service: TrainWagonSortRatioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainWagonSortRatioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not sort, if no stats available', () => {
    // Assign
    const wagonA: TrainWagonsInner = {};
    const wagonB: TrainWagonsInner = {};

    // Act
    const result = service.sort(wagonA, wagonB);

    // Assert
    expect(result).toBe(0);
  });

  it('should prefer wagonA, if stats of wagonB are unknown', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      numPassengerIcons: 1,
    };
    const wagonB: TrainWagonsInner = {};

    // Act
    const result = service.sort(wagonA, wagonB);

    // Assert
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('should prefer wagonB, if stats of wagonA are unknown', () => {
    // Assign
    const wagonA: TrainWagonsInner = {};
    const wagonB: TrainWagonsInner = {
      numPassengerIcons: 1,
    };

    // Act
    const result = service.sort(wagonA, wagonB);

    // Assert
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('should prefer wagonA, if ratio of wagonB is higher', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      numPassengerIcons: 1,
    };
    const wagonB: TrainWagonsInner = {
      numPassengerIcons: 2,
    };

    // Act
    const result = service.sort(wagonA, wagonB);

    // Assert
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('should prefer wagonB, if ratio of wagonA is higher', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      numPassengerIcons: 2,
    };
    const wagonB: TrainWagonsInner = {
      numPassengerIcons: 1,
    };

    // Act
    const result = service.sort(wagonA, wagonB);

    // Assert
    expect(result).toBeGreaterThanOrEqual(1);
  });
});
