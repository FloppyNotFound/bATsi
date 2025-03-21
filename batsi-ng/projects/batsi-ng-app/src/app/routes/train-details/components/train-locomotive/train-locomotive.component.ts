import { Component, input } from '@angular/core';

@Component({
  selector: 'batsi-train-locomotive',
  imports: [],
  templateUrl: './train-locomotive.component.html',
  styleUrl: './train-locomotive.component.scss',
})
export class TrainLocomotiveComponent {
  //#region Inputs
  readonly destination = input.required<string | undefined>();
  //#endregion
}
