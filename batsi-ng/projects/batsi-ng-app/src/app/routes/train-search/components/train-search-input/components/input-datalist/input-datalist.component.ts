import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'batsi-input-datalist',
  templateUrl: './input-datalist.component.html',
  styleUrls: ['./input-datalist.component.scss'],
  imports: [NgStyle, ReactiveFormsModule],
})
export class InputDatalistComponent {
  //#region Inputs
  readonly batsiFormControl = input.required<FormControl<string | null>>();
  readonly dataListId = input.required<string>();
  readonly label = input.required<string>();
  readonly options = input.required<string[]>();
  readonly labelWidth = input<number>();
  readonly inputMaxWidth = input<number>();
  readonly inputPlaceholder = input<string>('Suchen...');
  //#endregion

  readonly id = uuidv4();
}
