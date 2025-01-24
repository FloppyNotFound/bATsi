import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station } from '../services/stations/interfaces/station.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'batsi-train-search',
  imports: [JsonPipe],
  templateUrl: './train-search.component.html',
})
export class TrainSearchComponent {
  //#region Injections
  readonly #route = inject(ActivatedRoute);
  //#endregion

  readonly stations: Station[] | undefined;

  constructor() {
    this.stations = (this.#route.snapshot.data as { stations: Station[] }).stations;
  }
}
