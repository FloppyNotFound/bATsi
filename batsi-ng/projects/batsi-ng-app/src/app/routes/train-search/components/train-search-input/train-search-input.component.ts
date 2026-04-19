import { httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormField, form, required, schema } from '@angular/forms/signals';
import { Station, TrainInfoResponse } from 'batsi-ng-models';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ButtonWithSpinnerComponent } from './components/button-with-spinner/button-with-spinner.component';
import { InputDatalistComponent } from './components/input-datalist/input-datalist.component';
import { InputNumericComponent } from './components/input-numeric/input-numeric.component';
import { TrainQueryData } from './interfaces/train-query-data.interface';
import { TrainSearchFormModel } from './interfaces/train-search-form-model';
import { TrainSearchResult } from './interfaces/train-search-result.interface';
import { StationNamesPipe } from './pipes/station-names.pipe';
import { StationNumberService } from './services/station-number/station-number.service';

@Component({
  selector: 'batsi-train-search-input',
  imports: [
    ReactiveFormsModule,
    InputNumericComponent,
    InputDatalistComponent,
    ButtonWithSpinnerComponent,
    StationNamesPipe,
    FormField,
  ],
  templateUrl: './train-search-input.component.html',
  styleUrl: './train-search-input.component.scss',
})
export class TrainSearchInputComponent {
  //#region Inputs
  readonly init$ = input<Observable<TrainQueryData>>(); // TODO: not working
  readonly stations = input.required<Station[]>();
  //#endregion

  //#region Outputs
  readonly resetForm = output<void>();
  readonly trainFound = output<TrainSearchResult>();
  //#endregion

  //#region Injections
  readonly #stationNumberService = inject(StationNumberService);
  //#endregion

  protected readonly trainNumberSetFocus$: Observable<void>;
  readonly #trainNumberSetFocus = new Subject<void>();

  // Signal for current query parameters
  readonly #queryParams = signal<TrainQueryData | null>(null);

  // HttpResource for train search (reacts to query parameter changes)
  readonly #trainSearchResource = httpResource<{ data: TrainInfoResponse }>(
    () => {
      const params = this.#queryParams();
      if (!params) {
        return undefined;
      }

      return {
        url: `${environment.apiBaseUrl}/backend/info`,
        method: 'GET',
        headers: {
          api_token: environment.apiToken ?? '',
        },
        params: { ...params },
      };
    },
  );

  protected hasFormBeenSubmitted = signal<boolean>(false);

  // Class-level computed signals for resource state
  protected readonly isLoading = computed<boolean>(() =>
    this.#trainSearchResource.isLoading(),
  );
  protected readonly hasResult = computed<boolean>(() =>
    this.#trainSearchResource.hasValue(),
  );
  protected readonly data = computed<TrainInfoResponse | null>(() => {
    if (!this.#trainSearchResource.hasValue()) {
      return null;
    }

    return this.#trainSearchResource.value().data;
  });
  protected readonly error = computed<Error | undefined>(() =>
    this.#trainSearchResource.error(),
  );
  protected readonly showError = computed<boolean>(
    () => this.hasFormBeenSubmitted() && !this.hasResult(),
  );

  //#region Form
  readonly #initialFormModel: TrainSearchFormModel = {
    date: new Date().toISOString().split('T')[0],
    stationName: '',
    trainNumber: null,
  };

  readonly #formSchema = schema<TrainSearchFormModel>((p) => {
    required(p.trainNumber);
    required(p.stationName);
    required(p.date);
  });

  readonly #formModel = signal<TrainSearchFormModel>(this.#initialFormModel);
  readonly form = form(this.#formModel, this.#formSchema);
  //#endregion

  constructor() {
    this.trainNumberSetFocus$ = this.#trainNumberSetFocus.asObservable();

    effect(() => {
      const result = this.#trainSearchResource.hasValue()
        ? this.#trainSearchResource.value()
        : null;

      if (result) {
        const queryData = this.#toTrainQueryData(this.form().value());

        if (queryData) {
          const searchResult: TrainSearchResult = {
            query: queryData,
            response: this.data() as TrainInfoResponse,
          };
          this.trainFound.emit(searchResult);
        }
      }
    });

    effect(() => {
      const hasError = this.error();
      if (hasError) {
        this.#showSubmittedButNoResultsMessage();
      }
    });
  }

  //#region Event Callbacks
  protected onReset(): void {
    this.#formModel.set(this.#initialFormModel);

    this.resetForm.emit();
  }

  protected onSearch(event: SubmitEvent): void {
    event.preventDefault();

    if (this.isLoading()) {
      return;
    }

    // Check if form is valid
    const isFormValid = this.form().valid();
    if (!isFormValid) {
      this.#showSubmittedButNoResultsMessage();
      return;
    }

    const queryData = this.#toTrainQueryData(this.form().value());

    if (!queryData) {
      this.#showSubmittedButNoResultsMessage();
      return;
    }

    // Update the query parameters signal to trigger a new request
    this.#queryParams.set(queryData);
  }
  //#endregion

  #toTrainQueryData(
    formModel: TrainSearchFormModel,
  ): TrainQueryData | undefined {
    const trainNumber = formModel.trainNumber;
    const date = formModel.date;

    const stationName = formModel.stationName;
    const stationNumber = this.#stationNumberService.toStationNumber(
      stationName,
      this.stations(),
    );

    if (!trainNumber || !stationNumber || !date) {
      return void 0;
    }

    return {
      trainNr: trainNumber,
      date,
      station: stationNumber,
    } as TrainQueryData;
  }

  #showSubmittedButNoResultsMessage(): void {
    this.hasFormBeenSubmitted.set(true);

    setTimeout(() => {
      this.hasFormBeenSubmitted.set(false);
    }, 2000);
  }
}
