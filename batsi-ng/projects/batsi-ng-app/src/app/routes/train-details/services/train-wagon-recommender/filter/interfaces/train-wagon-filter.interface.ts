import { TrainWagonsInner } from 'batsi-ng-models';
import { TrainWagonFilter } from '../../../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

export interface TrainWagonFilterContract {
  filter: (filterState: TrainWagonFilter, wagon: TrainWagonsInner) => boolean;
}
