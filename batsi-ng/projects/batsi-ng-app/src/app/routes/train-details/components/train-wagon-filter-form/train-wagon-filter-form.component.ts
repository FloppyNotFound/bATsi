import { Component, computed, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrainWagonFilter } from './interfaces/train-wagon-filter.interface';
import { TrainWagonFilterFormModel } from './types/train-wagon-filter-form-model.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'batsi-ng-train-wagon-filter-form',
  templateUrl: './train-wagon-filter-form.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './train-wagon-filter-form.component.scss',
})
export class TrainWagonFilterFormComponent implements OnInit {
  //#region Inputs
  readonly destinations = input.required<string[]>();
  //#endregion

  //#region Injections
  readonly #destroyRef = inject(DestroyRef);
  //#endregion

  //#region Computed
  readonly destinationsSelectable = computed(() => {
    const destinations = this.destinations();
    if (destinations.length > 1) {
      return [this.destinationAll, ...destinations];
    }

    return destinations;
  });
  //#endregion

  readonly destinationAll = 'DESTINATIONS.ALL';

  readonly filterChanged = output<TrainWagonFilter>();

  readonly formModel: TrainWagonFilterFormModel = {
    destination: new FormControl(null),
    class: new FormControl(2),
  };

  readonly form: FormGroup<TrainWagonFilterFormModel>;

  constructor() {
    this.form = new FormGroup(this.formModel);
  }

  ngOnInit(): void {
    if (this.destinations().length === 1) {
      this.form.patchValue({ destination: this.destinations()[0] });
    }

    this.form.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(val => {
      this.#sendUpdate(<TrainWagonFilter>val);
    });

    this.#sendUpdate(<TrainWagonFilter>this.form.value);
  }

  #sendUpdate(val: TrainWagonFilter): void {
    this.filterChanged.emit(val);
  }
}
