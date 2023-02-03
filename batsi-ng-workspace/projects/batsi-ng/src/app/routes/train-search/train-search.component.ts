import { TrainInfoResponse, TrainService } from 'batsi-models';
import { TrainQueryData } from './interfaces/train-query-data.interface';
import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StationListItem } from '../../services/station-list/interfaces/station-list-item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainSearchResult } from './interfaces/train-search-result.interface';

@Component({
  selector: 'batsi-ng-train-search',
  templateUrl: './train-search.component.html'
})
export class TrainSearchComponent implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  readonly stations: StationListItem[] | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trainService: TrainService
  ) {
    this.stations = this._route.snapshot.data['stations'];
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
    const query = trainInfo.query;

    // TODO: store in state
    const response = trainInfo.response;
    console.log(response);

    this._router.navigate(['details'], {
      queryParams: {
        ...query
      },
      relativeTo: this._route
    });
  }
}
