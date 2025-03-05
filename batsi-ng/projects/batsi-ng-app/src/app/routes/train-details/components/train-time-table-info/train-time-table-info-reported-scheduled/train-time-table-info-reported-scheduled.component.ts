import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'batsi-ng-train-time-table-info-reported-scheduled',
  templateUrl: './train-time-table-info-reported-scheduled.component.html',
  styleUrls: ['./train-time-table-info-reported-scheduled.component.scss'],
  imports: [NgClass],
})
export class TrainTimeTableInfoReportedScheduledComponent {
  //#region Inputs
  readonly label = input<string | undefined>();

  readonly reported = input.required<number | string | undefined>();
  readonly scheduled = input.required<number | string | undefined>();
  //#endregion
}
