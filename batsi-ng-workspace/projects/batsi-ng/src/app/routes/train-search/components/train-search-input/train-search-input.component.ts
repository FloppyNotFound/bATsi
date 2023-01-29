import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { TrainSearchFormModel } from './models/train-search-form-model';

@Component({
  selector: 'batsi-ng-train-search-input',
  templateUrl: './train-search-input.component.html',
  styleUrls: ['./train-search-input.component.scss']
})
export class TrainSearchInputComponent {
  readonly trainSearchFormModel: TrainSearchFormModel = {
    trainNumber: new FormControl(null, { validators: Validators.required }),
    date: new FormControl(dayjs().format('YYYY-MM-DD'), {
      validators: Validators.required
    })
  };

  readonly trainSearchForm: FormGroup;

  constructor() {
    this.trainSearchForm = new FormGroup<TrainSearchFormModel>(
      this.trainSearchFormModel
    );
  }

  onSearch(): void {
    console.log(this.trainSearchForm.value);
  }
}
