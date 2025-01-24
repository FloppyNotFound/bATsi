import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainSearchInputComponent } from './components/train-search-input/train-search-input.component';
import { TrainSearchResult } from './components/train-search-input/interfaces/train-search-result.interface';
import { TrainQueryData } from './components/train-search-input/interfaces/train-query-data.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { TrainSearchStateService } from './state/train-search-state.service';
import { Station } from 'batsi-ng-models';

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
    this.stations = (this.#route.snapshot.data as { stations: Station[] }).stations;

    this.initQuery$ = this._initQuery.asObservable();
  }

  //#region Lifecycle
  ngOnInit(): void {
    const state = this.#trainSearchState.trainSearchResult;
    const query = state?.query;

    if (query) {
      this._initQuery.next(query);
    }
  }
  //#endregion

  //#region Event Callbacks
  protected onTrainFound(trainInfo: TrainSearchResult): void {
    this.#goToDetails(trainInfo);
  }

  protected onResetForm(): void {
    this.#trainSearchState.reset();
  }
  //#endregion

  #goToDetails(trainInfo: TrainSearchResult): void {
    this.#trainSearchState.cache(trainInfo);

    const query = trainInfo.query;
    this.#router.navigate(['details'], {
      queryParams: {
        ...query,
      },
      relativeTo: this.#route,
    });
  }
}
