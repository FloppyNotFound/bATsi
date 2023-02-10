import { Component, Input } from '@angular/core';
import { TimeTableInfo } from 'batsi-models';

@Component({
  selector: 'batsi-ng-train-time-table-info',
  templateUrl: './train-time-table-info.component.html',
  styleUrls: ['./train-time-table-info.component.scss']
})
export class TrainTimeTableInfoComponent {
  @Input() timeTableInfo: TimeTableInfo | undefined;
}
