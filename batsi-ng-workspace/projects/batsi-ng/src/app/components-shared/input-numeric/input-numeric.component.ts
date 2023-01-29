import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'batsi-ng-input-numeric',
  templateUrl: './input-numeric.component.html',
  styleUrls: ['./input-numeric.component.scss']
})
export class InputNumericComponent {
  @Input() batsiFormControl!: FormControl<number | null>;

  @Input() label!: string;

  @Input() labelWidth?: number;

  @Input() inputMaxWidth?: number;

  @Input() inputPlaceholder = 'Zahl eingeben';
}
