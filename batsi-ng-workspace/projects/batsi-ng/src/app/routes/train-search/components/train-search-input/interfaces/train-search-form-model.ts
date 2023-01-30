import { FormControl } from '@angular/forms';

export interface TrainSearchFormModel {
  trainNumber: FormControl<number | null>;
  stationName: FormControl<string | null>;
  date: FormControl<string | null>;
}
