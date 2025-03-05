import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrainWagonFilter } from './interfaces/train-wagon-filter.interface';
import { TrainWagonFilterFormModel } from './types/train-wagon-filter-form-model.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'batsi-ng-train-wagon-filter-form',
  templateUrl: './train-wagon-filter-form.component.html',
  imports: [ReactiveFormsModule],
})
export class TrainWagonFilterFormComponent implements OnInit {
  //#region Injections
  readonly #destroyRef = inject(DestroyRef);
  //#endregion

  readonly filterChanged = output<TrainWagonFilter>();

  readonly formModel: TrainWagonFilterFormModel = {
    class: new FormControl(2),
  };

  readonly form: FormGroup<TrainWagonFilterFormModel>;

  constructor() {
    this.form = new FormGroup(this.formModel);
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(val => {
      this.#sendUpdate(<TrainWagonFilter>val);
    });

    this.#sendUpdate(<TrainWagonFilter>this.form.value);
  }

  #sendUpdate(val: TrainWagonFilter): void {
    this.filterChanged.emit(val);
  }
}
