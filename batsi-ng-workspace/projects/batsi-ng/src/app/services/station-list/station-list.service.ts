import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from './../../../environments/environment';
import { StationListItem } from './interfaces/station-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StationListService {
  private readonly _stationsLocalStorageKey = 'stations';
  private readonly _proxyUrl = environment.proxyUrl;

  private _stations: StationListItem[] | undefined;

  constructor(private _httpClient: HttpClient) {}

  getStationList(): Observable<StationListItem[]> {
    if (this._stations) {
      return of(this._stations);
    }

    const stationsFromStorage = this.getStationsFromStorage();
    if (stationsFromStorage) {
      this._stations = stationsFromStorage;
      return of(stationsFromStorage);
    }

    return this.getStationsFromServer().pipe(
      tap(stations =>
        localStorage.setItem(
          this._stationsLocalStorageKey,
          JSON.stringify(stations)
        )
      ),
      tap(stations => (this._stations = stations))
    );
  }

  private getStationsFromStorage(): StationListItem[] | undefined {
    const stationsSavedRaw = localStorage.getItem(
      this._stationsLocalStorageKey
    );

    if (!stationsSavedRaw) {
      return void 0;
    }

    const stationsSaved = JSON.parse(stationsSavedRaw);
    return stationsSaved;
  }

  private getStationsFromServer(): Observable<StationListItem[]> {
    const url = new URL('assets/assets/stations.json', this._proxyUrl).href;

    return this._httpClient
      .get(url)
      .pipe(map(stations => <StationListItem[]>stations));
  }
}
