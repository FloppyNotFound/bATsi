import { TestBed } from '@angular/core/testing';
import { LoadStatsInner, TrainWagonsInner } from 'batsi-models';
import { TrainWagonSortRatioService } from './train-wagon-sort-ratio.service';

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
    const wagonA: TrainWagonsInner = {
      ranking: 1
    };
    const wagonB: TrainWagonsInner = {
      ranking: 2
    };
    const stats: LoadStatsInner[] = [];

    // Act
    const result = service.sort(wagonA, wagonB, stats);

    // Assert
    expect(result).toBe(0);
  });

  it('should prefer wagonA, if stats of wagonB are unknown', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      ranking: 1
    };
    const wagonB: TrainWagonsInner = {
      ranking: 2
    };
    const stats: LoadStatsInner[] = [
      {
        ranking: 1,
        ratio: 70
      }
    ];

    // Act
    const result = service.sort(wagonA, wagonB, stats);

    // Assert
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('should prefer wagonB, if stats of wagonA are unknown', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      ranking: 1
    };
    const wagonB: TrainWagonsInner = {
      ranking: 2
    };
    const stats: LoadStatsInner[] = [
      {
        ranking: 2,
        ratio: 70
      }
    ];

    // Act
    const result = service.sort(wagonA, wagonB, stats);

    // Assert
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('should prefer wagonA, if ratio of wagonA is higher', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      ranking: 1
    };
    const wagonB: TrainWagonsInner = {
      ranking: 2
    };
    const stats: LoadStatsInner[] = [
      {
        ranking: 1,
        ratio: 70
      },
      {
        ranking: 2,
        ratio: 71
      }
    ];

    // Act
    const result = service.sort(wagonA, wagonB, stats);

    // Assert
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('should prefer wagonB, if ratio of wagonA is higher', () => {
    // Assign
    const wagonA: TrainWagonsInner = {
      ranking: 1
    };
    const wagonB: TrainWagonsInner = {
      ranking: 2
    };
    const stats: LoadStatsInner[] = [
      {
        ranking: 1,
        ratio: 71
      },
      {
        ranking: 2,
        ratio: 70
      }
    ];

    // Act
    const result = service.sort(wagonA, wagonB, stats);

    // Assert
    expect(result).toBeGreaterThanOrEqual(1);
  });
});
