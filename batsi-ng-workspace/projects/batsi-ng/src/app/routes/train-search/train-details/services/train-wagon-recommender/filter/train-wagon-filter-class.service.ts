import { Injectable } from '@angular/core';
import { TrainWagonsInner } from 'batsi-models';
import { TrainWagonFilter } from '../../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';
import { TrainWagonFilterContract } from './interfaces/train-wagon-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainWagonFilterClassService implements TrainWagonFilterContract {
  filter(filterState: TrainWagonFilter, wagon: TrainWagonsInner): boolean {
    return (
      (filterState.class === 1 && !!wagon.capacityFirstClass) ||
      (filterState.class === 2 && !!wagon.capacitySecondClass)
    );
  }
}
