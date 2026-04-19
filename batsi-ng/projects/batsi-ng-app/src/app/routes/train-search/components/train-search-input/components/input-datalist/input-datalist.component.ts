import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'batsi-input-datalist',
  templateUrl: './input-datalist.component.html',
  styleUrls: ['./input-datalist.component.css'],
  imports: [NgStyle, ReactiveFormsModule, FormField],
})
export class InputDatalistComponent {
  //#region Inputs
  readonly batsiFormControl =
    input.required<FieldTree<string, string>>();
  readonly dataListId = input.required<string>();
  readonly label = input.required<string>();
  readonly options = input.required<string[]>();
  readonly labelWidth = input<number>();
  readonly inputMaxWidth = input<number>();
  readonly inputPlaceholder = input<string>('Suchen...');
  //#endregion

  protected readonly id = uuidv4();
}
