import { FormControl } from '@angular/forms';
import { TrainWagonFilter } from '../interfaces/train-wagon-filter.interface';

export type TrainWagonFilterFormModel = {
  [key in keyof TrainWagonFilter]: FormControl;
};
