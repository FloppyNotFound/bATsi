import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainSearchInputComponent } from './train-search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from '../../../../components-shared/components-shared.module';
import { ButtonWithSpinnerComponent } from './components/button-with-spinner/button-with-spinner.component';
import { StationNamesPipe } from './pipes/station-names.pipe';

@NgModule({
  declarations: [
    TrainSearchInputComponent,
    ButtonWithSpinnerComponent,
    StationNamesPipe
  ],
  imports: [CommonModule, ReactiveFormsModule, ComponentsSharedModule],
  exports: [TrainSearchInputComponent]
})
export class TrainSearchInputModule {}
