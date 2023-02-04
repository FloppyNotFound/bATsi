import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
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
export class TrainSearchInputComponent implements OnInit, OnDestroy {
  @Input() init$: Observable<TrainQueryData> | undefined;

  @Input() getTrainInfo!: (
    trainQueryData: TrainQueryData
  ) => Observable<TrainInfoResponse>;

  @Input() stations: StationListItem[] | undefined;

  @Output() readonly resetForm = new EventEmitter<void>();

  @Output() readonly trainFound = new EventEmitter<TrainSearchResult>();

  readonly trainSearchForm: FormGroup;

  readonly trainSearchFormModel: TrainSearchFormModel;

  hasResult = false;
  hasFormBeenSubmitted = false;

  readonly trainNumberSetFocus$: Observable<void>;
  private readonly _trainNumberSetFocus = new Subject<void>();

  readonly isLoading$: Observable<boolean>;
  private readonly _isLoading = new BehaviorSubject(false);

  private readonly _unsubscribe = new Subject<void>();

  constructor(private _stationService: StationNumberService) {
    const dateTodayFormatted = this.getDateTodayFormatted();
    this.trainSearchFormModel = this.toInitialFormModel(dateTodayFormatted);

    this.trainSearchForm = new FormGroup<TrainSearchFormModel>(
      this.trainSearchFormModel
    );

    this.isLoading$ = this._isLoading.asObservable();

    this.trainNumberSetFocus$ = this._trainNumberSetFocus.asObservable();
  }

  ngOnInit(): void {
    if (this.init$) {
      this.init$.pipe(takeUntil(this._unsubscribe)).subscribe(init => {
        this.initModel(init);
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onReset(): void {
    const dateTodayFormatted = this.getDateTodayFormatted();
    this.trainSearchForm.reset({ date: dateTodayFormatted });

    this.resetForm.next();
  }

  onSearch(): void {
    const isLoading = this._isLoading.getValue();
    if (isLoading) {
      return;
    }

    const queryData = this.toTrainQueryData(this.trainSearchFormModel);

    if (!queryData) {
      this.showSubmittedButNoResultsMessage();
      return;
    }

    this._isLoading.next(true);
    this.getTrainInfo(queryData)
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
          query: queryData,
          response: trainInfo
        };
        this.trainFound.emit(result);
      });
  }

  private getDateTodayFormatted(): string {
    return dayjs().format('YYYY-MM-DD');
  }

  private toInitialFormModel(date: string): TrainSearchFormModel {
    return {
      trainNumber: new FormControl(null, { validators: Validators.required }),
      stationName: new FormControl(null, { validators: Validators.required }),
      date: new FormControl(date, {
        validators: Validators.required
      })
    };
  }

  private initModel(init: TrainQueryData) {
    const trainName = this._stationService.toStationName(
      init.stationNumber,
      this.stations
    );
    const query = this.toTrainSearchFormModel(init, trainName);
    this.trainSearchForm.setValue(query);
  }

  private toTrainSearchFormModel(
    init: TrainQueryData,
    trainName: string | null
  ) {
    return <
      {
        [key in keyof TrainSearchFormModel]: string | number;
      }
    >{
      date: init.date,
      stationName: trainName,
      trainNumber: init.trainNumber
    };
  }

  private toTrainQueryData(
    formModel: TrainSearchFormModel
  ): TrainQueryData | undefined {
    const trainNumber = formModel.trainNumber.value;
    const date = formModel.date.value;

    const stationName = formModel.stationName.value;
    const stationNumber = this._stationService.toStationNumber(
      stationName,
      this.stations
    );

    if (!trainNumber || !stationNumber || !date) {
      return void 0;
    }

    return <TrainQueryData>{
      trainNumber,
      date,
      stationNumber
    };
  }

  private showSubmittedButNoResultsMessage(): void {
    this.hasFormBeenSubmitted = true;

    setTimeout(() => {
      this.hasFormBeenSubmitted = false;
    }, 2000);
  }
}
