import { environment } from './../../../environments/environment';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StationListItem } from './interfaces/station-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StationListService {
  private readonly _stationListUrl = environment.stationsUrl;

  private _stations: StationListItem[] | undefined;

  constructor(private _httpClient: HttpClient) {}

  getStationList(): Observable<StationListItem[]> {
    if (this._stations) {
      return of(this._stations);
    }

    return this._httpClient.get(this._stationListUrl).pipe(
      map(stations => <StationListItem[]>stations),
      tap(stations => (this._stations = stations))
    );
  }
}
