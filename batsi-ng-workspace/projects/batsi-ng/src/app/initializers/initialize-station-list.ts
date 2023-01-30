import { Observable } from 'rxjs';
import { StationListItem } from '../services/station-list/interfaces/station-list-item.interface';
import { StationListService } from '../services/station-list/station-list.service';

const initializeStationList = (
  stationListService: StationListService
): (() => Observable<StationListItem[]>) => {
  return () => stationListService.getStationList();
};

export { initializeStationList };
