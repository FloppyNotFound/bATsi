import { NgStyle } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'batsi-input-numeric',
  templateUrl: './input-numeric.component.html',
  styleUrls: ['./input-numeric.component.scss'],
  imports: [ReactiveFormsModule, NgStyle, FormField],
})
export class InputNumericComponent implements OnInit {
  //#region Inputs
  readonly batsiFormControl =
    input.required<FieldTree<number | null, string>>();
  readonly label = input.required<string>();
  readonly labelWidth = input<number>();
  readonly inputMaxWidth = input<number>();
  readonly inputPlaceholder = input<string>('Zahl eingeben');
  readonly focus$ = input<Observable<void> | undefined>();
  //#endregion

  //#region ViewChildren
  readonly inputNumericCtl = viewChild.required<ElementRef>('inputNumericCtl');
  //#endregion

  //#region Injections
  readonly #destroyRef = inject(DestroyRef);
  //#endregion

  readonly id = uuidv4();

  //#region Lifecycle
  ngOnInit(): void {
    this.#setupOnFocus();
  }
  //#endregion

  #setupOnFocus(): void {
    const focus$ = this.focus$();
    if (!focus$) {
      return;
    }

    focus$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.inputNumericCtl().nativeElement.focus();
    });
  }
}
