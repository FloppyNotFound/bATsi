import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TrainSearchFormModel } from './interfaces/train-search-form-model';

@Component({
  selector: 'batsi-ng-train-search-input',
  templateUrl: './train-search-input.component.html',
  styleUrls: ['./train-search-input.component.scss']
})
export class TrainSearchInputComponent {
  readonly trainSearchForm: FormGroup;

  readonly trainSearchFormModel: TrainSearchFormModel = {
    trainNumber: new FormControl(null, { validators: Validators.required }),
    date: new FormControl(dayjs().format('YYYY-MM-DD'), {
      validators: Validators.required
    })
  };

  hasResult = false;
  hasFormBeenSubmitted = false;

  readonly trainNumberSetFocus$: Observable<void>;
  private readonly _trainNumberSetFocus = new Subject<void>();

  readonly isLoading$: Observable<boolean>;
  private readonly _isLoading = new BehaviorSubject(false);

  constructor() {
    this.trainSearchForm = new FormGroup<TrainSearchFormModel>(
      this.trainSearchFormModel
    );

    this.isLoading$ = this._isLoading.asObservable();

    this.trainNumberSetFocus$ = this._trainNumberSetFocus.asObservable();
  }

  onSearch(): void {
    const isLoading = this._isLoading.getValue();
    if (isLoading) {
      return;
    }

    const trainNumber = this.trainSearchFormModel.trainNumber.value;
    const date = this.trainSearchFormModel.date.value;

    console.log(trainNumber, date);

    this._isLoading.next(true);

    setTimeout(() => {
      this._isLoading.next(false);
      this._trainNumberSetFocus.next();

      this.hasFormBeenSubmitted = true;

      setTimeout(() => {
        this.hasFormBeenSubmitted = false;
      }, 2000);
    }, 2000);
  }
}
