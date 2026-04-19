import { Injectable, signal } from '@angular/core';
import { form, required, schema } from '@angular/forms/signals';
import { TrainSearchFormModel } from '../interfaces/train-search-form-model';

@Injectable()
export class TrainSearchFormService {
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
  protected readonly form = form(this.#formModel, this.#formSchema);

  getForm(): typeof this.form {
    return this.form;
  }

  resetForm(): void {
    this.#formModel.set(this.#initialFormModel);
  }

  getFormValue(): TrainSearchFormModel {
    return this.form().value();
  }
}
