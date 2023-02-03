import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { TrainInfoResponse } from 'batsi-models';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Observable,
  Subject,
  takeUntil
} from 'rxjs';
import { TrainSearchFormModel } from './interfaces/train-search-form-model';
import { StationNumberService } from './services/station-number/station-number.service';
import { StationListItem } from './../../../../services/station-list/interfaces/station-list-item.interface';
import { TrainQueryData } from './../../interfaces/train-query-data.interface';
import { TrainSearchResult } from '../../interfaces/train-search-result.interface';

@Component({
  selector: 'batsi-ng-train-search-input',
  templateUrl: './train-search-input.component.html',
  styleUrls: ['./train-search-input.component.scss']
})
export class TrainSearchInputComponent implements OnDestroy {
  @Input() getTrainInfo!: (
    trainQueryData: TrainQueryData
  ) => Observable<TrainInfoResponse>;

  @Input() stations: StationListItem[] | undefined;

  @Output() readonly trainFound = new EventEmitter<TrainSearchResult>();

  readonly trainSearchForm: FormGroup;

  readonly trainSearchFormModel: TrainSearchFormModel = {
    trainNumber: new FormControl(null, { validators: Validators.required }),
    stationName: new FormControl(null, { validators: Validators.required }),
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

  constructor(private _stationService: StationNumberService) {
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

    const stationName = this.trainSearchFormModel.stationName.value;

    const stationNumber = this._stationService.toStationNumber(
      stationName,
      this.stations
    );

    if (trainNumber === null || stationNumber === null || !date) {
      this.showSubmittedButNoResultsMessage();
      return;
    }

    const trainQueryData = <TrainQueryData>{
      trainNumber,
      date,
      stationNumber
    };

    this._isLoading.next(true);
    this.getTrainInfo(trainQueryData)
      .pipe(
        takeUntil(this._unsubscribe),
        catchError(() => {
          this._isLoading.next(false);
          this.showSubmittedButNoResultsMessage();

          return EMPTY;
        })
      )
      .subscribe(trainInfo => {
        const result: TrainSearchResult = {
          query: trainQueryData,
          response: trainInfo
        };
        this.trainFound.emit(result);
      });
  }

  private showSubmittedButNoResultsMessage(): void {
    this.hasFormBeenSubmitted = true;

    setTimeout(() => {
      this.hasFormBeenSubmitted = false;
    }, 2000);
  }
}
