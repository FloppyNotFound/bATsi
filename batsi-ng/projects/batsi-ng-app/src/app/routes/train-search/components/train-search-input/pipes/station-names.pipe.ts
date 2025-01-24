import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '../../../../../services/stations/interfaces/station.interface';

@Pipe({
  name: 'stationNames',
})
export class StationNamesPipe implements PipeTransform {
  transform(stations: Station[] | undefined): string[] {
    if (!stations?.length) {
      return [];
    }

    return stations.map(station => station.name);
  }
}
