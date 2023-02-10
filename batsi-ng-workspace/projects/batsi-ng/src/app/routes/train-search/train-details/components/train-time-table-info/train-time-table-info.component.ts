import { Component, Input, OnInit } from '@angular/core';
import { TimeTableInfo } from 'batsi-models';

@Component({
  selector: 'batsi-ng-train-time-table-info',
  templateUrl: './train-time-table-info.component.html',
  styleUrls: ['./train-time-table-info.component.scss']
})
export class TrainTimeTableInfoComponent implements OnInit {
  @Input() timeTableInfo: TimeTableInfo | undefined;

  ngOnInit(): void {
    if (!this.timeTableInfo?.platform) {
      return;
    }
    this.timeTableInfo.platform.reported = 8;
    this.timeTableInfo.platform.scheduled = void 0;
  }
}
