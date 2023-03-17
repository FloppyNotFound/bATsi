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
      .filter(w => this.filterClass(filter.class, w))
      .sort((a, b) => this.sortByRatioAsc(a, b, stats));
  }

  private filterClass(cls: number, wagon: TrainWagonsInner): boolean {
    return (
      (cls === 1 && !!wagon.capacityFirstClass) ||
      (cls === 2 && !!wagon.capacitySecondClass)
    );
  }

  private sortByRatioAsc(
    a: TrainWagonsInner,
    b: TrainWagonsInner,
    stats: LoadStatsInner[]
  ): number {
    const loadA = this.getRatio(stats, a);
    const loadB = this.getRatio(stats, b);

    return loadA - loadB;
  }

  private getRatio(stats: LoadStatsInner[], wagon: TrainWagonsInner): number {
    const wagonStat = stats.find(s => s.ranking === wagon.ranking);

    return wagonStat?.ratio ?? 999;
  }
}
