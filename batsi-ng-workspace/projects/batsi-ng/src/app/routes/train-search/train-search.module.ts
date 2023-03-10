import { TrainSearchInputModule } from './components/train-search-input/train-search-input.module';
import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainSearchComponent } from './train-search.component';
import { trainSearchRoutes } from './train-search-routes';
import { TrainDetailsComponent } from './train-details/train-details.component';

@NgModule({
  declarations: [TrainSearchComponent, TrainDetailsComponent],
  imports: [CommonModule, TrainSearchInputModule],
  providers: [provideRouter(trainSearchRoutes)]
})
export class TrainSearchModule {}
