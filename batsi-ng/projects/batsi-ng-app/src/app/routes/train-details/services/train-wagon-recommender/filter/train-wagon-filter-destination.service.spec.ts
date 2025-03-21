import { TestBed } from '@angular/core/testing';
import { TrainWagonFilterDestinationService } from './train-wagon-filter-destination.service';
import { TrainWagonFilter } from '../../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';
import { TrainWagonsInner } from 'batsi-ng-models';

describe('TrainWagonFilterDestinationService', () => {
  let service: TrainWagonFilterDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainWagonFilterDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter if no destination', () => {
    // Assign
    const wagon: TrainWagonsInner = {
      destinationName: 'Lorem Hbf',
    };
    const filter = { class: 2, destination: null } as TrainWagonFilter;

    // Act
    const result = service.filter(filter, wagon);

    // Asert
    expect(result).toBeTruthy();
  });

  it('should not filter if destination matches', () => {
    // Assign
    const wagon: TrainWagonsInner = {
      destinationName: 'Lorem Hbf',
    };
    const filter = { class: 2, destination: 'Lorem Hbf' } as TrainWagonFilter;

    // Act
    const result = service.filter(filter, wagon);

    // Asert
    expect(result).toBeTruthy();
  });

  it('should filter if destination not matching', () => {
    // Assign
    const wagon: TrainWagonsInner = {
      destinationName: 'Lorem Hbf',
    };
    const filter = { class: 2, destination: 'Ipsum Hbf' } as TrainWagonFilter;

    // Act
    const result = service.filter(filter, wagon);

    // Asert
    expect(result).toBeFalsy();
  });
});
