import { Injectable } from '@angular/core';
import { TrainWagonsInner } from 'batsi-ng-models';
import { TrainWagonSortContract } from './interfaces/train-wagon-sort-contract.interface';

@Injectable({
  providedIn: 'root',
})
export class TrainWagonSortRatioService implements TrainWagonSortContract {
  sort(a: TrainWagonsInner, b: TrainWagonsInner): number {
    const loadA = this.#getRatio(a);
    const loadB = this.#getRatio(b);

    return loadA - loadB;
  }

  #getRatio(wagon: TrainWagonsInner): number {
    return wagon.numPassengerIcons ?? 999;
  }
}
