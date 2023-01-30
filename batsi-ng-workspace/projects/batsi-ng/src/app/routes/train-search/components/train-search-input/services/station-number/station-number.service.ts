import { Injectable } from '@angular/core';
import { StationListItem } from '../../../../../../services/station-list/interfaces/station-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StationNumberService {
  toStationNumber(
    stationName: string | null,
    stations: StationListItem[] | undefined
  ): number | null {
    if (!stationName || !stations) {
      return null;
    }

    const number = stations.find(s =>
      s.name.toLowerCase().includes(stationName.toLowerCase())
    )?.eva;

    return number !== null && number !== void 0 ? Number(number) : null;
  }
}
