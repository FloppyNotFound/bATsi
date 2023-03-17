import { Injectable } from '@angular/core';
import { LoadStatsInner, TrainWagonsInner } from 'batsi-models';
import { TrainWagonFilter } from '../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainWagonRecommenderService {
  getWagonsOptimized(
    wagons: TrainWagonsInner[] | undefined,
    filter: TrainWagonFilter,
    stats: LoadStatsInner[] | undefined
  ): TrainWagonsInner[] | undefined {
    if (!wagons?.length || !filter || !stats?.length) {
      return wagons;
    }

    return wagons
      .filter(
        w =>
          (filter.class === 1 && w.capacityFirstClass) ||
          (filter.class === 2 && w.capacitySecondClass)
      )
      .sort((a, b) => {
        const loadA = this.getRatio(stats, a);
        const loadB = this.getRatio(stats, b);

        return loadA - loadB;
      });
  }

  private getRatio(
    stats: LoadStatsInner[] | undefined,
    wagon: TrainWagonsInner
  ): number {
    return stats?.find(s => s.ranking === wagon.ranking)?.ratio ?? 100;
  }
}
