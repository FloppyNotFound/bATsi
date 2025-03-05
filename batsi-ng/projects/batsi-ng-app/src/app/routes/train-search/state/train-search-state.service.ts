import { Injectable } from '@angular/core';
import { TrainSearchResult } from '../interfaces/train-search-result.interface';

@Injectable({ providedIn: 'root' })
export class TrainSearchStateService {
  private _trainSearchResult!: TrainSearchResult | undefined;
  public get trainSearchResult(): TrainSearchResult | undefined {
    return this._trainSearchResult;
  }

  cache(trainSearchResult: TrainSearchResult): void {
    this._trainSearchResult = trainSearchResult;
  }

  reset(): void {
    this._trainSearchResult = void 0;
  }
}
