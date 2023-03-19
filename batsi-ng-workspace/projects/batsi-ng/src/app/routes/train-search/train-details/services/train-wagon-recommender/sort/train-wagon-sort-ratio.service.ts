import { Injectable } from '@angular/core';
import { LoadStatsInner, TrainWagonsInner } from 'batsi-models';
import { TrainWagonSortContract } from './interfaces/train-wagon-sort-contract.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainWagonSortRatioService implements TrainWagonSortContract {
  sort(
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
