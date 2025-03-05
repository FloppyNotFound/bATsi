import { TrainWagonsInner } from 'batsi-ng-models';

export interface TrainWagonSortContract {
  sort: (a: TrainWagonsInner, b: TrainWagonsInner) => number;
}
