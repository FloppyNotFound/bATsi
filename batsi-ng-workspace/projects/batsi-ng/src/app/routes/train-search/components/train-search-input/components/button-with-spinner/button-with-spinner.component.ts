import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'batsi-ng-button-with-spinner',
  templateUrl: './button-with-spinner.component.html'
})
export class ButtonWithSpinnerComponent {
  @Input() isLoading$!: Observable<boolean>;

  @Input() label!: string;
}
