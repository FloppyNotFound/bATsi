import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainInfoResponse, TrainService } from 'batsi-models';
import * as dayjs from 'dayjs';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Observable,
  Subject,
  takeUntil
} from 'rxjs';
import { TrainSearchFormModel } from './interfaces/train-search-form-model';

@Component({
  selector: 'batsi-ng-train-search-input',
  templateUrl: './train-search-input.component.html',
  styleUrls: ['./train-search-input.component.scss']
})
export class TrainSearchInputComponent implements OnDestroy {
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

  private readonly _unsubscribe = new Subject<void>();

  constructor(private _trainService: TrainService) {
    this.trainSearchForm = new FormGroup<TrainSearchFormModel>(
      this.trainSearchFormModel
    );

    this.isLoading$ = this._isLoading.asObservable();

    this.trainNumberSetFocus$ = this._trainNumberSetFocus.asObservable();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onSearch(): void {
    const isLoading = this._isLoading.getValue();
    if (isLoading) {
      return;
    }

    const trainNumber = this.trainSearchFormModel.trainNumber.value;
    const date = this.trainSearchFormModel.date.value;
    const station = 8100002;

    if (trainNumber === null || !date) {
      this.showSubmittedButNoResultsMessage();
      return;
    }

    this._isLoading.next(true);
    this._trainService
      .backendInfoGet(trainNumber, date, station)
      .pipe(
        takeUntil(this._unsubscribe),
        catchError(() => {
          this._isLoading.next(false);
          this.showSubmittedButNoResultsMessage();

          return EMPTY;
        })
      )
      .subscribe(trainInfo => {
        this.goToDetails(trainInfo);
      });
  }

  private goToDetails(trainInfo: TrainInfoResponse): void {
    throw new Error(
      'goToDetails: Method not implemented. ' + JSON.stringify(trainInfo)
    );
  }

  private showSubmittedButNoResultsMessage(): void {
    this.hasFormBeenSubmitted = true;

    setTimeout(() => {
      this.hasFormBeenSubmitted = false;
    }, 2000);
  }
}
