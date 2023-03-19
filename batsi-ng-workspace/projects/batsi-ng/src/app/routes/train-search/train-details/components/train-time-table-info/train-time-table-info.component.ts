import { Component, Input } from '@angular/core';
import { TimeTableInfo } from 'batsi-models';

@Component({
  selector: 'batsi-ng-train-time-table-info',
  templateUrl: './train-time-table-info.component.html'
})
export class TrainTimeTableInfoComponent {
  @Input() timeTableInfo: TimeTableInfo | undefined;
}
