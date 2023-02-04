import { TrainQueryData } from './../interfaces/train-query-data.interface';
import { TrainSearchResult } from './../interfaces/train-search-result.interface';
import { TrainSearchStateService } from './../state/train-search-state.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, tap, catchError, of, EMPTY, switchMap } from 'rxjs';
import { TrainService } from 'batsi-models';

@Injectable({
  providedIn: 'root'
})
export class CanActivateTrainSearchDetailsGuard implements CanActivate {
  constructor(
    private _state: TrainSearchStateService,
    private _trainService: TrainService,
    private _router: Router
  ) {}

  canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (this._state.trainSearchResult) {
      return true;
    }

    const queryData = <TrainQueryData | undefined>snapshot.queryParams;
    if (
      !queryData ||
      !queryData.date ||
      !queryData.stationNumber ||
      !queryData.trainNumber
    ) {
      this.goToStartPage();
      return false;
    }

    return this._trainService
      .backendInfoGet(
        queryData.trainNumber,
        queryData.date,
        queryData.stationNumber
      )
      .pipe(
        catchError(() => of(void 0)),
        tap(response => {
          if (!response) {
            return;
          }

          const result: TrainSearchResult = {
            query: queryData,
            response
          };
          this._state.cache(result);
        }),
        switchMap(result => {
          if (!result) {
            this.goToStartPage();
            return EMPTY;
          }

          return of(true);
        })
      );
  }

  private goToStartPage(): void {
    this._router.navigate(['/']);
  }
}
