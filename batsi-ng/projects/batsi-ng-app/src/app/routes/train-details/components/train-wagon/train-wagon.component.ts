import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TrainWagonsInner } from 'batsi-ng-models';

@Component({
  selector: 'batsi-ng-train-wagon',
  templateUrl: './train-wagon.component.html',
  styleUrls: ['./train-wagon.component.scss'],
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainWagonComponent {
  //#region Injections
  readonly wagon = input.required<TrainWagonsInner>();
  //#endregion

  //#region Computed
  readonly loadRatioUnknown = computed(() => this.wagon().numPassengerIcons === void 0);

  readonly loadRatioLow = computed(() => {
    const ratio = this.wagon().numPassengerIcons;
    if (ratio === void 0) {
      return false;
    }

    return ratio === 1;
  });

  readonly loadRatioMedium = computed(() => {
    const ratio = this.wagon().numPassengerIcons;
    if (ratio === void 0) {
      return false;
    }

    return ratio === 2;
  });

  readonly loadRatioHigh = computed(() => {
    const ratio = this.wagon().numPassengerIcons;
    if (ratio === void 0) {
      return false;
    }

    return ratio === 2;
  });
  //#endregion
}
