import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainSearchResult } from './interfaces/train-search-result.interface';
import { catchError, EMPTY, Observable, Subject, from, map } from 'rxjs';
import { TrainQueryData } from './interfaces/train-query-data.interface';
import { Station, backendInfoGet } from 'batsi-ng-models';
import dayjs from 'dayjs';
import { TrainSearchFormModel } from './interfaces/train-search-form-model';
import { StationNumberService } from './services/station-number/station-number.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputNumericComponent } from './components/input-numeric/input-numeric.component';
import { InputDatalistComponent } from './components/input-datalist/input-datalist.component';
import { StationNamesPipe } from './pipes/station-names.pipe';
import { ButtonWithSpinnerComponent } from './components/button-with-spinner/button-with-spinner.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'batsi-train-search-input',
  imports: [
    ReactiveFormsModule,
    InputNumericComponent,
    InputDatalistComponent,
    ButtonWithSpinnerComponent,
    StationNamesPipe,
  ],
  templateUrl: './train-search-input.component.html',
  styleUrl: './train-search-input.component.scss',
})
export class TrainSearchInputComponent {
  //#region Inputs
  readonly init$ = input<Observable<TrainQueryData>>();
  readonly stations = input.required<Station[]>();
  //#endregion

  //#region Outputs
  readonly resetForm = output<void>();
  readonly trainFound = output<TrainSearchResult>();
  //#endregion

  //#region Injections
  readonly #destroyRef = inject(DestroyRef);
  readonly #stationNumberService = inject(StationNumberService);
  //#endregion

  readonly isLoading = signal<boolean>(false);

  readonly trainNumberSetFocus$: Observable<void>;
  readonly #trainNumberSetFocus = new Subject<void>();

  protected hasResult = false;
  protected hasFormBeenSubmitted = false;

  readonly trainSearchForm: FormGroup;
  readonly trainSearchFormModel: TrainSearchFormModel;

  constructor() {
    this.trainNumberSetFocus$ = this.#trainNumberSetFocus.asObservable();

    const dateTodayFormatted = this.#getDateTodayFormatted();
    this.trainSearchFormModel = this.#toInitialFormModel(dateTodayFormatted);

    this.trainSearchForm = new FormGroup<TrainSearchFormModel>(this.trainSearchFormModel);
  }

  //#region Event Callbacks
  protected onReset(): void {
    const dateTodayFormatted = this.#getDateTodayFormatted();
    this.trainSearchForm.reset({ date: dateTodayFormatted });

    this.resetForm.emit();
  }

  protected onSearch(): void {
    if (this.isLoading()) {
      return;
    }

    const queryData = this.#toTrainQueryData(this.trainSearchFormModel);

    if (!queryData) {
      this.#showSubmittedButNoResultsMessage();
      return;
    }

    const apiToken = environment.apiToken;
    if (!apiToken) {
      throw new Error('apiToken needs to be set');
    }

    this.isLoading.set(true);
    from(backendInfoGet<true>({
      headers: {
        api_token: apiToken
      },
      query: {
        trainNr: queryData.trainNumber,
        date: queryData.date,
        station: queryData.stationNumber
      },
      responseStyle: 'data'
    })).pipe(
      takeUntilDestroyed(this.#destroyRef),
      catchError(() => {
        this.isLoading.set(false);
        this.#showSubmittedButNoResultsMessage();

        return EMPTY;
      }),
    )
    .pipe(
      map(response => response.data)
    )
    .subscribe(trainInfo => {
      this.isLoading.set(false);
      if (trainInfo) {
        const result: TrainSearchResult = {
          query: queryData,
          response: trainInfo,
        };
        this.trainFound.emit(result);
      }
    });
  }
  //#endregion

  #getDateTodayFormatted(): string {
    return dayjs().format('YYYY-MM-DD');
  }

  #toInitialFormModel(date: string): TrainSearchFormModel {
    return {
      trainNumber: new FormControl(null, { validators: Validators.required }),
      stationName: new FormControl(null, { validators: Validators.required }),
      date: new FormControl(date, {
        validators: Validators.required,
      }),
    };
  }

  #toTrainQueryData(formModel: TrainSearchFormModel): TrainQueryData | undefined {
    const trainNumber = formModel.trainNumber.value;
    const date = formModel.date.value;

    const stationName = formModel.stationName.value;
    const stationNumber = this.#stationNumberService.toStationNumber(stationName, this.stations());

    if (!trainNumber || !stationNumber || !date) {
      return void 0;
    }

    return {
      trainNumber,
      date,
      stationNumber,
    } as TrainQueryData;
  }

  #showSubmittedButNoResultsMessage(): void {
    this.hasFormBeenSubmitted = true;

    setTimeout(() => {
      this.hasFormBeenSubmitted = false;
    }, 2000);
  }
}
