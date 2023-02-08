import { Pipe, PipeTransform } from '@angular/core';
import { StationListItem } from '../../../../../services/station-list/interfaces/station-list-item.interface';

@Pipe({
  name: 'stationNames'
})
export class StationNamesPipe implements PipeTransform {
  transform(stations: StationListItem[] | undefined): string[] {
    if (!stations?.length) return [];

    return stations.map(station => station.name);
  }
}
