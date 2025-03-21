import { Injectable } from '@angular/core';
import { TrainWagonsInner } from 'batsi-ng-models';
import { TrainWagonFilter } from '../../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class TrainWagonFilterDestinationService {
  filter(filter: TrainWagonFilter, wagon: TrainWagonsInner): boolean {
    if (!filter.destination) {
      return true;
    }

    return wagon.destinationName === filter.destination;
  }
}
