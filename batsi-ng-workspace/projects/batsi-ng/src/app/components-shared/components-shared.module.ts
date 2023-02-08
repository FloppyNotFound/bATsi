import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumericComponent } from './input-numeric/input-numeric.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDatalistComponent } from './input-datalist/input-datalist.component';

@NgModule({
  declarations: [InputNumericComponent, InputDatalistComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputNumericComponent, InputDatalistComponent]
})
export class ComponentsSharedModule {}
