import { Injectable } from '@angular/core';
import { LoadStatsInner, TrainWagonsInner } from 'batsi-models';
import { TrainWagonFilter } from '../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';
import { TrainWagonFilterClassService } from './filter/train-wagon-filter-class.service';
import { TrainWagonSortRatioService } from './sort/train-wagon-sort-ratio.service';

@Injectable({
  providedIn: 'root'
})
export class TrainWagonRecommenderService {
  constructor(
    private _trainWagonFilterClassService: TrainWagonFilterClassService,
    private _trainWagonSortRatioService: TrainWagonSortRatioService
  ) {}

  getWagonsOptimized(
    wagons: TrainWagonsInner[] | undefined,
    filter: TrainWagonFilter,
    stats: LoadStatsInner[] | undefined
  ): TrainWagonsInner[] | undefined {
    if (!wagons?.length || !filter || !stats?.length) {
      return void 0;
    }

    return wagons
      .filter(wagon => this._trainWagonFilterClassService.filter(filter, wagon))
      .sort((a, b) => this._trainWagonSortRatioService.sort(a, b, stats));
  }
}
