import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Station } from 'batsi-ng-models';
import { Observable } from 'rxjs';
import { StationsService } from '../services/stations/stations.service';

export const stationsResolver: ResolveFn<Station[]> = (): Observable<Station[]> => {
  const stationListService = inject(StationsService);

  return stationListService.getStationList();
};
