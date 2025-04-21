import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Station, StationsService as BffStationsService } from 'batsi-ng-models';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  //#region Injections
  readonly #stationsService = inject(BffStationsService);
  //#endregion

  readonly #stationsLocalStorageKey = 'stations';

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
    const apiToken = environment.apiToken;
    if(!apiToken) {
      throw new Error('apiToken needs to be set');
    }
    
    return this.#stationsService.stationsGet(apiToken);
  }
}
