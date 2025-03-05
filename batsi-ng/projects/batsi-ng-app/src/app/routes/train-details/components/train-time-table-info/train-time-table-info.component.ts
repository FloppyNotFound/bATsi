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

  //#region Platform
  readonly platformScheduled = computed(() => {
    const platform = this.timeTableInfo().platform;
    const scheduled = this.#toScheduled(platform);

    if (!scheduled) {
      return void 0;
    }

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

  //#region Time
  readonly timeScheduled = computed(() => {
    const time = this.timeTableInfo().time;
    const scheduled = this.#toScheduled(time);

    if (!scheduled) {
      return void 0;
    }

    return scheduled.substring(2, scheduled.length);
  });

  readonly timeReported = computed(() => {
    const time = this.timeTableInfo().time;
    if (!time) {
      return void 0;
    }

    const reported = time.split(' ')[0];

    return this.#toTime(reported);
  });

  #toTime(reported: string): string | undefined {
    return reported.substring(2, reported.length);
  }
  //#endregion

  #toScheduled(input: string | undefined): string | undefined {
    if (!input?.length) {
      return void 0;
    }

    const inputSplit = input.split(' ');
    if (inputSplit.length < 2) {
      return void 0;
    }

    const scheduledRaw = inputSplit[1];

    return scheduledRaw.replace('(', '').replace(')', '');
  }
}
