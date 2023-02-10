import { Component, Input } from '@angular/core';
import { TimeTableInfoTimeScheduled } from 'batsi-models';

@Component({
  selector: 'batsi-ng-train-time-table-info-reported-scheduled',
  templateUrl: './train-time-table-info-reported-scheduled.component.html',
  styleUrls: ['./train-time-table-info-reported-scheduled.component.scss']
})
export class TrainTimeTableInfoReportedScheduledComponent {
  @Input() label: string | undefined;

  @Input() reported: TimeTableInfoTimeScheduled | number | undefined;
  @Input() scheduled: TimeTableInfoTimeScheduled | number | undefined;

  @Input() labelReported: string | number | undefined;
  @Input() labelScheduled: string | number | undefined;
}
