import { Pipe, PipeTransform } from '@angular/core';
import { TimeTableInfoTimeScheduled } from 'batsi-models';

@Pipe({
  name: 'isTimetableScheduledEqualReported'
})
export class IsTimetableScheduledEqualReportedPipe implements PipeTransform {
  transform(
    scheduled: number | TimeTableInfoTimeScheduled | undefined,
    reported: number | TimeTableInfoTimeScheduled | undefined
  ): boolean {
    const hashScheduled = window.btoa(JSON.stringify(scheduled));
    const hashReported = window.btoa(JSON.stringify(reported));

    return hashScheduled === hashReported;
  }
}
