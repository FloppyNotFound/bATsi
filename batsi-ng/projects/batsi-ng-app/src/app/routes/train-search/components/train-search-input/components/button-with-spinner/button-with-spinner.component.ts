import { Component, input } from '@angular/core';

@Component({
  selector: 'batsi-button-with-spinner',
  templateUrl: './button-with-spinner.component.html',
})
export class ButtonWithSpinnerComponent {
  //#region Inputs
  readonly isLoading = input.required<boolean>();
  readonly label = input.required<string>();
  //#endregion
}
