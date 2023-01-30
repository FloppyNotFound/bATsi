import { TestBed } from '@angular/core/testing';
import { StationNumberService } from './station-number.service';
import { StationListItem } from '../../../../../../services/station-list/interfaces/station-list-item.interface';

describe('StationNumberService', () => {
  let service: StationNumberService;

  let stations: StationListItem[] | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationNumberService);

    stations = [
      {
        eva: '123',
        name: 'Teststation'
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null, if no station name was provided', () => {
    // Assign
    const stationName = '';

    // Act
    const result = service.toStationNumber(stationName, stations);

    // Assert
    expect(result).toBe(null);
  });

  it('should return null, if no stations were provided', () => {
    // Assign
    const stationName = 'Lorem';
    stations = [];

    // Act
    const result = service.toStationNumber(stationName, stations);

    // Assert
    expect(result).toBe(null);
  });

  it('should return null, if no station was found', () => {
    // Assign
    const stationName = 'Lorem';

    // Act
    const result = service.toStationNumber(stationName, stations);

    // Assert
    expect(result).toBe(null);
  });

  it('should return station number, if found', () => {
    // Assign
    const stationName = 'Teststation';

    // Act
    const result = service.toStationNumber(stationName, stations);

    // Assert
    expect(result).toBe(123);
  });
});
