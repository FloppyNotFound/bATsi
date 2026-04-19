import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { backendInfoGet } from 'batsi-ng-models';
import { catchError, EMPTY, from, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TrainQueryData } from '../routes/train-search/interfaces/train-query-data.interface';
import { TrainSearchResult } from '../routes/train-search/interfaces/train-search-result.interface';
import { TrainSearchStateService } from '../routes/train-search/state/train-search-state.service';

const canActivateTrainDetailsGuard: CanActivateFn = (snapshot: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const state = inject(TrainSearchStateService);

  if (state.trainSearchResult) {
    return true;
  }

  const queryData = snapshot.queryParams as TrainQueryData | undefined;
  if (!queryData?.date || !queryData?.stationNumber || !queryData?.trainNumber) {
    router.navigate(['/']);
    return false;
  }

  const apiToken = environment.apiToken;
  if (!apiToken) {
    throw new Error('apiToken needs to be set');
  }

  return from(
    backendInfoGet<true>({
      headers: {
        api_token: apiToken,
      },
      query: {
        trainNr: queryData.trainNumber,
        date: queryData.date,
        station: queryData.stationNumber,
      },
    }),
  ).pipe(
    map(response => response.data),
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
