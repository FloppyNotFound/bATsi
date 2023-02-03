import { StationListService } from './../services/station-list/station-list.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { StationListItem } from '../services/station-list/interfaces/station-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StationListResolver implements Resolve<StationListItem[]> {
  constructor(private _stationListService: StationListService) {}

  resolve(): Observable<StationListItem[]> {
    return this._stationListService.getStationList();
  }
}
