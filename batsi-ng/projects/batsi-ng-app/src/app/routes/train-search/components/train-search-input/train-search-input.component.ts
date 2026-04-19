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
import { FormField } from '@angular/forms/signals';
import { Station, TrainInfoResponse } from 'batsi-ng-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ButtonWithSpinnerComponent } from './components/button-with-spinner/button-with-spinner.component';
import { InputDatalistComponent } from './components/input-datalist/input-datalist.component';
import { InputNumericComponent } from './components/input-numeric/input-numeric.component';
import { TrainSearchFormService } from './form/train-search-form.service';
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
  styleUrl: './train-search-input.component.css',
  providers: [TrainSearchFormService],
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
  readonly #formService = inject(TrainSearchFormService);
  //#endregion

  //#region Set Focus
  protected readonly trainNumberSetFocus$: Observable<boolean>;
  readonly #trainNumberSetFocus = new BehaviorSubject<boolean>(true);
  //#endregion

  //#region HTTP
  readonly #queryParams = signal<TrainQueryData | null>(null);

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
  //#endregion

  //#region Computed
  protected readonly isLoading = computed<boolean>(() =>
    this.#trainSearchResource.isLoading(),
  );
  protected readonly hasResult = computed<boolean>(() =>
    this.#trainSearchResource.hasValue(),
  );
  protected readonly data = computed<TrainInfoResponse | null>(() =>
    this.#trainSearchResource.hasValue()
      ? this.#trainSearchResource.value().data
      : null,
  );
  protected readonly error = computed<Error | undefined>(() =>
    this.#trainSearchResource.error(),
  );
  protected readonly showError = computed<boolean>(
    () => this.hasFormBeenSubmitted() && !this.hasResult(),
  );
  //#endregion

  //#region Form
  protected readonly form = this.#formService.getForm();
  protected readonly hasFormBeenSubmitted = signal<boolean>(false);
  //#endregion

  constructor() {
    this.trainNumberSetFocus$ = this.#trainNumberSetFocus.asObservable();

    effect(() => {
      const result = this.data();
      if (!result) {
        return;
      }

      const queryData = this.#toTrainQueryData(
        this.#formService.getFormValue(),
      );
      if (!queryData) {
        return;
      }

      this.trainFound.emit({
        query: queryData,
        response: result,
      });
    });

    effect(() => {
      if (this.error()) {
        this.#showSubmittedButNoResultsMessage();
      }
    });
  }

  //#region Event Callbacks
  protected onReset(): void {
    this.#formService.resetForm();

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

    const queryData = this.#toTrainQueryData(this.#formService.getFormValue());
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
      return undefined;
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
