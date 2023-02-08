import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'batsi-ng-input-datalist',
  templateUrl: './input-datalist.component.html',
  styleUrls: ['./input-datalist.component.scss']
})
export class InputDatalistComponent {
  @Input() batsiFormControl!: FormControl<string | null>;

  @Input() dataListId!: string;

  @Input() label!: string;

  @Input() options!: string[];

  @Input() labelWidth?: number;

  @Input() inputMaxWidth?: number;

  @Input() inputPlaceholder = 'Suchen...';
}
