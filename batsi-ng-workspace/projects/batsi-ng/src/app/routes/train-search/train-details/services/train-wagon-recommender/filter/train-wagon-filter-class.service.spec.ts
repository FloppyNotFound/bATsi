import { TestBed } from '@angular/core/testing';
import { TrainWagonsInner } from 'batsi-models';
import { TrainWagonFilter } from '../../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

import { TrainWagonFilterClassService } from './train-wagon-filter-class.service';

describe('TrainWagonFilterClassService', () => {
  let service: TrainWagonFilterClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainWagonFilterClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter second class wagon if first class is selected', () => {
    // Assign
    const state: TrainWagonFilter = { class: 1 };
    const wagon: TrainWagonsInner = {
      capacityFirstClass: 0,
      capacitySecondClass: 1
    };

    // Act
    const result = service.filter(state, wagon);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should not filter fist class wagon if first class is selected', () => {
    // Assign
    const state: TrainWagonFilter = { class: 1 };
    const wagon: TrainWagonsInner = {
      capacityFirstClass: 1,
      capacitySecondClass: 0
    };

    // Act
    const result = service.filter(state, wagon);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should not filter fist class wagon if first class is selected and capacity also for second class', () => {
    // Assign
    const state: TrainWagonFilter = { class: 1 };
    const wagon: TrainWagonsInner = {
      capacityFirstClass: 1,
      capacitySecondClass: 1
    };

    // Act
    const result = service.filter(state, wagon);

    // Assert
    expect(result).toBeTruthy();
  });
});
