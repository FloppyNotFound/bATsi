import { inject, Injectable } from '@angular/core';
import { TrainWagonFilterClassService } from './filter/train-wagon-filter-class.service';
import { TrainWagonSortRatioService } from './sort/train-wagon-sort-ratio.service';
import { TrainWagonsInner } from 'batsi-ng-models';
import { TrainWagonFilter } from '../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';
import { TrainWagonFilterDestinationService } from './filter/train-wagon-filter-destination.service';

@Injectable({
  providedIn: 'root',
})
export class TrainWagonRecommenderService {
  //#region Injections
  readonly #trainWagonFilterClassService = inject(TrainWagonFilterClassService);
  readonly #trainWagonSortRatioService = inject(TrainWagonSortRatioService);
  readonly #trainWagonFilterDestinationService = inject(TrainWagonFilterDestinationService);
  //#endregion

  getWagonsOptimized(wagons: TrainWagonsInner[] | undefined, filter: TrainWagonFilter): TrainWagonsInner[] | undefined {
    if (!wagons?.length || !filter) {
      return void 0;
    }

    return wagons
      .filter(wagon => this.#trainWagonFilterDestinationService.filter(filter, wagon))
      .filter(wagon => this.#trainWagonFilterClassService.filter(filter, wagon))
      .toSorted((a, b) => this.#trainWagonSortRatioService.sort(a, b));
  }
}
