import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumericComponent } from './input-numeric/input-numeric.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputNumericComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputNumericComponent]
})
export class ComponentsSharedModule {}
