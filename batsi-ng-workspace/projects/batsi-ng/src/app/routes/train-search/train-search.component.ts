import { TrainInfoResponse, TrainService } from 'batsi-models';
import { TrainQueryData } from './interfaces/train-query-data.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StationListItem } from '../../services/station-list/interfaces/station-list-item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainSearchResult } from './interfaces/train-search-result.interface';
import { TrainSearchStateService } from './state/train-search-state.service';

@Component({
  selector: 'batsi-ng-train-search',
  templateUrl: './train-search.component.html'
})
export class TrainSearchComponent implements OnInit, OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  readonly stations: StationListItem[] | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trainService: TrainService,
    private _trainSearchState: TrainSearchStateService
  ) {
    this.stations = this._route.snapshot.data['stations'];
  }

  ngOnInit(): void {
    const state = this._trainSearchState.trainSearchResult;
    const query = state?.query;

    if (query) {
      console.log('query', query);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getTrainInfo = (
    trainQueryData: TrainQueryData
  ): Observable<TrainInfoResponse> => {
    return this._trainService.backendInfoGet(
      trainQueryData.trainNumber,
      trainQueryData.date,
      trainQueryData.stationNumber
    );
  };

  onTrainFound(trainInfo: TrainSearchResult): void {
    this.goToDetails(trainInfo);
  }

  private goToDetails(trainInfo: TrainSearchResult): void {
    this._trainSearchState.cache(trainInfo);

    const query = trainInfo.query;
    this._router.navigate(['details'], {
      queryParams: {
        ...query
      },
      relativeTo: this._route
    });
  }
}
