import { inject, Injectable } from '@angular/core';
import { TrainWagonFilterClassService } from './filter/train-wagon-filter-class.service';
import { TrainWagonSortRatioService } from './sort/train-wagon-sort-ratio.service';
import { TrainWagonsInner } from 'batsi-ng-models';
import { TrainWagonFilter } from '../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class TrainWagonRecommenderService {
  //#region Injections
  readonly #trainWagonFilterClassService = inject(TrainWagonFilterClassService);
  readonly #trainWagonSortRatioService = inject(TrainWagonSortRatioService);
  //#endregion

  getWagonsOptimized(wagons: TrainWagonsInner[] | undefined, filter: TrainWagonFilter): TrainWagonsInner[] | undefined {
    if (!wagons?.length || !filter) {
      return void 0;
    }

    return wagons
      .filter(wagon => this.#trainWagonFilterClassService.filter(filter, wagon))
      .toSorted((a, b) => this.#trainWagonSortRatioService.sort(a, b));
  }
}
