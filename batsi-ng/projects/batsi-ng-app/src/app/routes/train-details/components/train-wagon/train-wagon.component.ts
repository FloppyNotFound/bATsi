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

  //#region Computed: Load Ratio
  readonly loadRatioUnknown = computed(() => !this.wagon().numPassengerIcons);

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

    return ratio === 3;
  });
  //#endregion

  //#region Computed: other
  readonly isLocomotiveFront = computed(() => this.wagon().kind === 4);
  readonly isLocomotiveRear = computed(() => this.wagon().kind === 8);
  //#endregion
}
