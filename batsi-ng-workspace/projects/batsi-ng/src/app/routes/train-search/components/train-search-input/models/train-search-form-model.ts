import { FormControl } from '@angular/forms';

export interface TrainSearchFormModel {
  date: FormControl<string | null>;
  trainNumber: FormControl<number | null>;
}
