import { Injectable } from '@angular/core';
import { AppState, StatesService } from 'ngx-state-stack';
import { TrainSearchResult } from '../interfaces/train-search-result.interface';

@Injectable({ providedIn: 'root' })
export class TrainSearchStateService implements AppState {
  private _routePath!: string;
  public get routePath(): string {
    return this._routePath;
  }

  private _trainSearchResult!: TrainSearchResult;
  public get trainSearchResult(): TrainSearchResult {
    return this._trainSearchResult;
  }

  constructor(private _states: StatesService) {}

  cache(routePath: string, trainSearchResult: TrainSearchResult): void {
    this._routePath = routePath;
    this._trainSearchResult = trainSearchResult;

    this._states.cache(this);
  }
}
