import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Station } from './interfaces/station.interface';
import { environment } from '../../../environments/environment.develop';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  //#region Injections
  readonly #httpClient = inject(HttpClient);
  //#endregion

  readonly #stationsLocalStorageKey = 'stations';
  readonly #proxyUrl = environment.apiBaseUrl;

  #stations: Station[] | undefined;

  getStationList(): Observable<Station[]> {
    if (this.#stations) {
      return of(this.#stations);
    }

    const stationsFromStorage = this.#getStationsFromStorage();
    if (stationsFromStorage) {
      this.#stations = stationsFromStorage;
      return of(stationsFromStorage);
    }

    return this.#getStationsFromServer().pipe(
      tap(stations => localStorage.setItem(this.#stationsLocalStorageKey, JSON.stringify(stations))),
      tap(stations => {
        this.#stations = stations;
      }),
    );
  }

  #getStationsFromStorage(): Station[] | undefined {
    const stationsSavedRaw = localStorage.getItem(this.#stationsLocalStorageKey);

    if (!stationsSavedRaw) {
      return void 0;
    }

    const stationsSaved = JSON.parse(stationsSavedRaw);
    return stationsSaved;
  }

  #getStationsFromServer(): Observable<Station[]> {
    const url = new URL('assets/assets/stations.json', this.#proxyUrl).href;

    const httpHeaders: HttpHeaders = new HttpHeaders({
      API_TOKEN: environment.apiToken,
    });

    return this.#httpClient
      .get(url, {
        headers: httpHeaders,
      })
      .pipe(map(stations => <Station[]>stations));
  }
}
