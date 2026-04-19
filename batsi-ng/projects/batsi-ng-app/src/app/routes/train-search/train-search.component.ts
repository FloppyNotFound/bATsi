import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from 'batsi-ng-models';
import { Observable, ReplaySubject } from 'rxjs';
import { TrainQueryData } from './components/train-search-input/interfaces/train-query-data.interface';
import { TrainSearchResult as TrainSearchResultInput } from './components/train-search-input/interfaces/train-search-result.interface';
import { TrainSearchResult } from './interfaces/train-search-result.interface';
import { TrainSearchInputComponent } from './components/train-search-input/train-search-input.component';
import { TrainSearchStateService } from './state/train-search-state.service';

@Component({
  selector: 'batsi-train-search',
  imports: [TrainSearchInputComponent],
  templateUrl: './train-search.component.html',
})
export class TrainSearchComponent implements OnInit {
  //#region Injections
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #trainSearchState = inject(TrainSearchStateService);
  //#endregion

  readonly initQuery$: Observable<TrainQueryData>;
  private readonly _initQuery = new ReplaySubject<TrainQueryData>();

  readonly stations: Station[];

  constructor() {
    this.stations = (
      this.#route.snapshot.data as { stations: Station[] }
    ).stations;

    this.initQuery$ = this._initQuery.asObservable();
  }

  //#region Lifecycle
  ngOnInit(): void {
    const state = this.#trainSearchState.trainSearchResult;
    const query = state?.query;

    if (query) {
      // Convert to the input component's interface format
      const convertedQuery: TrainQueryData = {
        trainNr: query.trainNumber,
        date: query.date,
        station: query.stationNumber,
      };
      this._initQuery.next(convertedQuery);
    }
  }
  //#endregion

  //#region Event Callbacks
  protected onTrainFound(trainInfo: TrainSearchResultInput): void {
    this.#goToDetails(trainInfo);
  }

  protected onResetForm(): void {
    this.#trainSearchState.reset();
  }
  //#endregion

  #goToDetails(trainInfo: TrainSearchResultInput): void {
    // Convert to the parent component's interface format
    const convertedResult: TrainSearchResult = {
      query: {
        trainNumber: trainInfo.query.trainNr,
        date: trainInfo.query.date,
        stationNumber: trainInfo.query.station,
      },
      response: trainInfo.response,
    };

    this.#trainSearchState.cache(convertedResult);

    const query = convertedResult.query;
    this.#router.navigate(['details'], {
      queryParams: {
        ...query,
      },
      relativeTo: this.#route,
    });
  }
}
