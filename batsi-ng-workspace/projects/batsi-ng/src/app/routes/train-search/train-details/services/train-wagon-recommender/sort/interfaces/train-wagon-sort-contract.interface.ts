import { LoadStatsInner, TrainWagonsInner } from 'batsi-models';

export interface TrainWagonSortContract {
  sort: (
    a: TrainWagonsInner,
    b: TrainWagonsInner,
    stats: LoadStatsInner[]
  ) => number;
}
