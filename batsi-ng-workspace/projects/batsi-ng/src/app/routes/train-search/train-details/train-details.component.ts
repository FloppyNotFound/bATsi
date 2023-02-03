import { Component, OnInit } from '@angular/core';
import { TrainInfoResponse } from 'batsi-models';
import { TrainSearchStateService } from './../state/train-search-state.service';

@Component({
  selector: 'batsi-ng-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.scss']
})
export class TrainDetailsComponent implements OnInit {
  state: TrainInfoResponse | undefined;

  constructor(private _trainSearchState: TrainSearchStateService) {}

  ngOnInit(): void {
    this.state = this.getState();

    if (!this.state) {
      throw Error('invalid state');
    }
  }

  private getState(): TrainInfoResponse | undefined {
    return this._trainSearchState.trainSearchResult?.response;
  }
}
