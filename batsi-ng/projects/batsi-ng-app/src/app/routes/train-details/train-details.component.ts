import { Component, inject } from '@angular/core';
import { TrainTimeTableInfoComponent } from './components/train-time-table-info/train-time-table-info.component';
import { TimeTableInfo, Train, TrainInfoResponse } from 'batsi-ng-models';
import { TrainSearchStateService } from '../train-search/state/train-search-state.service';
import { TrainWagonFilterFormComponent } from './components/train-wagon-filter-form/train-wagon-filter-form.component';
import { TrainWagonFilter } from './components/train-wagon-filter-form/interfaces/train-wagon-filter.interface';
import { TrainWagonRecommenderService } from './services/train-wagon-recommender/train-wagon-recommender.service';
import { TrainWagonComponent } from './components/train-wagon/train-wagon.component';
import { TrainDestinationsPipe } from './pipes/train-destinations.pipe';

@Component({
  selector: 'batsi-train-details',
  imports: [TrainTimeTableInfoComponent, TrainWagonFilterFormComponent, TrainWagonComponent, TrainDestinationsPipe],
  templateUrl: './train-details.component.html',
  styleUrl: './train-details.component.scss',
})
export class TrainDetailsComponent {
  //#region Injections
  readonly #trainSearchState = inject(TrainSearchStateService);
  readonly #trainWagonRecommender = inject(TrainWagonRecommenderService);
  //#endregion

  readonly train: Train | undefined;
  readonly timeTableInfo: TimeTableInfo | undefined;

  wagonSuggestedNr: number | undefined;

  constructor() {
    const state = this.#getState();
    this.train = state?.train;
    this.timeTableInfo = state?.timeTableInfo;
  }

  //#region Event Callbacks
  onFilterChanged(filter: TrainWagonFilter): void {
    const wagons = this.train?.wagons;

    const wagonsOptimized = this.#trainWagonRecommender.getWagonsOptimized(wagons, filter);

    const wagonSuggested = wagonsOptimized?.[0];
    this.wagonSuggestedNr = wagonSuggested?.ranking;
  }
  //#endregion

  #getState(): TrainInfoResponse | undefined {
    return this.#trainSearchState.trainSearchResult?.response;
  }
}
