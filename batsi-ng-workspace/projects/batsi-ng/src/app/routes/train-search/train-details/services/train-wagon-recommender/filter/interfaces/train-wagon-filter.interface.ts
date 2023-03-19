import { TrainWagonsInner } from 'batsi-models';
import { TrainWagonFilter } from '../../../../components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';

export interface TrainWagonFilterContract {
  filter: (filterState: TrainWagonFilter, wagon: TrainWagonsInner) => boolean;
}
