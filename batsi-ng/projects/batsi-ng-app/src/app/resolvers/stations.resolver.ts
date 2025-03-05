import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { StationsService } from '../services/stations/stations.service';
import { Station } from 'batsi-ng-models';

export const stationsResolver: ResolveFn<Station[]> = (): Observable<Station[]> => {
  const stationListService = inject(StationsService);

  return stationListService.getStationList();
};
