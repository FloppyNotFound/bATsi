import { Pipe, PipeTransform } from '@angular/core';
import { TrainWagonsInner } from 'batsi-ng-models';

@Pipe({
  name: 'trainDestinations',
})
export class TrainDestinationsPipe implements PipeTransform {
  transform(wagons: TrainWagonsInner[] | undefined): string[] {
    if (!wagons?.length) {
      return [];
    }

    const destinations = wagons.map(w => w.destinationName ?? '').filter(destination => !!destination);
    const destinationsUnique = [...new Set(destinations)];

    return destinationsUnique;
  }
}
