import { Component, OnInit } from '@angular/core';
import { TrainInfoResponse } from 'batsi-models';
import { TrainSearchStateService } from './../state/train-search-state.service';

@Component({
  selector: 'batsi-ng-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.scss']
})
export class TrainDetailsComponent implements OnInit {
  state!: TrainInfoResponse;

  constructor(private _trainSearchState: TrainSearchStateService) {}

  ngOnInit(): void {
    this.state = this._trainSearchState.trainSearchResult.response;
  }
}
