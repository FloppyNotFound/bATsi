import { TrainInfoResponse, TrainService } from 'batsi-models';
import { TrainQueryData } from './interfaces/train-query-data.interface';
import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StationListItem } from '../../services/station-list/interfaces/station-list-item.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'batsi-ng-train-search',
  templateUrl: './train-search.component.html'
})
export class TrainSearchComponent implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  readonly stations: StationListItem[] | undefined;

  constructor(
    private _route: ActivatedRoute,
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

  onTrainFound(trainInfo: TrainInfoResponse): void {
    this.goToDetails(trainInfo);
  }

  private goToDetails(trainInfo: TrainInfoResponse): void {
    throw new Error(
      'goToDetails: Method not implemented. ' + JSON.stringify(trainInfo)
    );
  }
}
