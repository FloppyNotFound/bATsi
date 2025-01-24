import { Injectable } from '@angular/core';
import { Station } from 'batsi-ng-models';

@Injectable({
  providedIn: 'root',
})
export class StationNumberService {
  toStationNumber(stationName: string | null, stations: Station[] | undefined): number | null {
    if (!stationName || !stations) {
      return null;
    }

    const number = stations.find(s => s.name?.toLowerCase().includes(stationName.toLowerCase()))?.eva;

    return number !== null && number !== void 0 ? Number(number) : null;
  }

  toStationName(stationNumber: number, stations: Station[] | undefined): string | null {
    if (!stations?.length) {
      return null;
    }

    const name = stations.find(s => s.eva === stationNumber.toString())?.name;

    return name ?? null;
  }
}
