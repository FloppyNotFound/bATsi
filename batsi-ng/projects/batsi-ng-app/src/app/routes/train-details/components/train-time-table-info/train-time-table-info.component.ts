import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TimeTableInfo } from 'batsi-ng-models';
import { TrainTimeTableInfoReportedScheduledComponent } from './train-time-table-info-reported-scheduled/train-time-table-info-reported-scheduled.component';

@Component({
  selector: 'batsi-train-time-table-info',
  templateUrl: './train-time-table-info.component.html',
  imports: [DatePipe, TrainTimeTableInfoReportedScheduledComponent],
})
export class TrainTimeTableInfoComponent {
  //#region Injections
  readonly timeTableInfo = input.required<TimeTableInfo>();
  //#endregion

  //#region Computed
  readonly platformScheduled = computed(() => {
    const platform = this.timeTableInfo().platform;
    if (!platform) {
      return void 0;
    }

    const platformSplit = platform.split(' ');
    if (platformSplit.length < 2) {
      return void 0;
    }

    const scheduledRaw = platformSplit[1];

    const scheduled = scheduledRaw.replace('(', '').replace(')', '');

    return Number(scheduled);
  });

  readonly platformReported = computed(() => {
    const platform = this.timeTableInfo().platform;
    if (!platform) {
      return void 0;
    }

    const reported = platform.split(' ')[0];

    return Number(reported);
  });
  //#endregion
}
