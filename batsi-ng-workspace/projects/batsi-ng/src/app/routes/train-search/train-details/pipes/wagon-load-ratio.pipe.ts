import { Pipe, PipeTransform } from '@angular/core';
import { LoadStatsInner } from 'batsi-models';

@Pipe({
  name: 'wagonLoadRatio'
})
export class WagonLoadRatioPipe implements PipeTransform {
  transform(
    stats: LoadStatsInner[] | undefined,
    ranking: number | undefined
  ): number | undefined {
    if (!stats?.length) {
      return void 0;
    }

    if (!ranking) {
      return void 0;
    }

    const ratio = stats.find(stat => stat.ranking === ranking)?.ratio;

    if (ratio === void 0) {
      return void 0;
    }

    return Math.ceil(ratio * 100);
  }
}
