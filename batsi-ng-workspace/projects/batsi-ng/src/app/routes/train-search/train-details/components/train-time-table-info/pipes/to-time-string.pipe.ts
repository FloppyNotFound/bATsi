import { Pipe, PipeTransform } from '@angular/core';
import { TimeTableInfoTimeScheduled } from 'batsi-models';

@Pipe({
  name: 'toTimeString'
})
export class ToTimeStringPipe implements PipeTransform {
  transform(time: TimeTableInfoTimeScheduled | undefined): string {
    const hours = time?.hours;
    const minutes = time?.minutes;

    if (hours === void 0 || minutes === void 0) {
      return '';
    }

    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hoursStr}:${minutesStr}h`;
  }
}
