import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { TrainSearchStateService } from '../routes/train-search/state/train-search-state.service';
import { TrainQueryData } from '../routes/train-search/interfaces/train-query-data.interface';
import { TrainService } from 'batsi-ng-models';
import { catchError, EMPTY, of, switchMap, tap } from 'rxjs';
import { TrainSearchResult } from '../routes/train-search/interfaces/train-search-result.interface';
import { environment } from '../../environments/environment';

const canActivateTrainDetailsGuard: CanActivateFn = (snapshot: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const state = inject(TrainSearchStateService);
  const trainService = inject(TrainService);

  if (state.trainSearchResult) {
    return true;
  }

  const queryData = snapshot.queryParams as TrainQueryData | undefined;
  if (!queryData?.date || !queryData?.stationNumber || !queryData?.trainNumber) {
    router.navigate(['/']);
    return false;
  }

  const apiToken = environment.apiToken;
    if(!apiToken) {
      throw new Error('apiToken needs to be set');
    }

  return trainService
    .backendInfoGet(apiToken, queryData.trainNumber, queryData.date, queryData.stationNumber)
    .pipe(
      catchError(() => of(void 0)),
      tap(response => {
        if (!response) {
          return;
        }

        const result = {
          query: queryData,
          response,
        } as TrainSearchResult;

        state.cache(result);
      }),
      switchMap(response => {
        if (!response) {
          router.navigate(['/']);
          return EMPTY;
        }

        return of(true);
      }),
    );
};

export { canActivateTrainDetailsGuard };
