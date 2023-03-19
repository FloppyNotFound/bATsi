import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TrainWagonFilter } from './interfaces/train-wagon-filter.interface';
import { TrainWagonFilterFormModel } from './types/train-wagon-filter-form-model.type';

@Component({
  selector: 'batsi-ng-train-wagon-filter-form',
  templateUrl: './train-wagon-filter-form.component.html'
})
export class TrainWagonFilterFormComponent implements OnInit, OnDestroy {
  @Output() filterChanged = new EventEmitter<TrainWagonFilter>();

  readonly formModel: TrainWagonFilterFormModel = {
    class: new FormControl(2)
  };

  readonly form: FormGroup<TrainWagonFilterFormModel>;

  private readonly _unsubscribe = new Subject<void>();

  constructor() {
    this.form = new FormGroup(this.formModel);
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(val => {
      this.sendUpdate(<TrainWagonFilter>val);
    });

    this.sendUpdate(<TrainWagonFilter>this.form.value);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private sendUpdate(val: TrainWagonFilter): void {
    this.filterChanged.emit(val);
  }
}
