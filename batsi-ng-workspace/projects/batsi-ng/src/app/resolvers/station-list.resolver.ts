import { StationListService } from './../services/station-list/station-list.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { StationListItem } from '../services/station-list/interfaces/station-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StationListResolver {
  constructor(private _stationListService: StationListService) {}

  resolve(): Observable<StationListItem[]> {
    return this._stationListService.getStationList();
  }
}
