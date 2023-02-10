import { Component } from '@angular/core';
import { LoadStatsInner, Train, TrainInfoResponse } from 'batsi-models';
import { TrainSearchStateService } from './../state/train-search-state.service';

@Component({
  selector: 'batsi-ng-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.scss']
})
export class TrainDetailsComponent {
  readonly train: Train | undefined;
  readonly stats: LoadStatsInner[] | undefined;

  constructor(private _trainSearchState: TrainSearchStateService) {
    const state = this.getState();
    this.train = state?.train;
    this.stats = state?.load?.stats;
  }

  private getState(): TrainInfoResponse | undefined {
    return this._trainSearchState.trainSearchResult?.response;
  }
}
