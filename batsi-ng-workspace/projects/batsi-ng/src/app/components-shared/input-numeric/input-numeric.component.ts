import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'batsi-ng-input-numeric',
  templateUrl: './input-numeric.component.html',
  styleUrls: ['./input-numeric.component.scss']
})
export class InputNumericComponent implements OnInit, OnDestroy {
  @Input() batsiFormControl!: FormControl<number | null>;

  @Input() label!: string;

  @Input() labelWidth?: number;

  @Input() inputMaxWidth?: number;

  @Input() inputPlaceholder = 'Zahl eingeben';

  @Input() focus$: Observable<void> | undefined;

  @ViewChild('inputNumericCtl') inputNumericCtl!: ElementRef;

  private readonly _unsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.setupOnFocus();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private setupOnFocus() {
    if (!this.focus$) {
      return;
    }

    this.focus$.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
      this.inputNumericCtl.nativeElement.focus();
    });
  }
}
