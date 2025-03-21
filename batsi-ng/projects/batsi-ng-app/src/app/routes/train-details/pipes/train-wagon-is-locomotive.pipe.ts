import { Pipe, PipeTransform } from '@angular/core';
import { TrainWagonsInner } from 'batsi-ng-models';

@Pipe({
  name: 'trainWagonIsLocomotive',
})
export class TrainWagonIsLocomotivePipe implements PipeTransform {
  transform(wagon: TrainWagonsInner): boolean {
    return wagon.ranking === 0;
  }
}
