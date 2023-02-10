import { TrainSearchInputModule } from './components/train-search-input/train-search-input.module';
import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainSearchComponent } from './train-search.component';
import { trainSearchRoutes } from './train-search-routes';
import { TrainDetailsComponent } from './train-details/train-details.component';
import { TrainWagonComponent } from './train-details/components/train-wagon/train-wagon.component';
import { WagonLoadRatioPipe } from './train-details/pipes/wagon-load-ratio.pipe';
import { TrainTimeTableInfoComponent } from './train-details/components/train-time-table-info/train-time-table-info.component';
import { IsTimetableScheduledEqualReportedPipe } from './train-details/components/train-time-table-info/pipes/is-timetable-scheduled-equal-reported.pipe';

@NgModule({
  declarations: [
    TrainSearchComponent,
    TrainDetailsComponent,
    TrainWagonComponent,
    WagonLoadRatioPipe,
    TrainTimeTableInfoComponent,
    IsTimetableScheduledEqualReportedPipe
  ],
  imports: [CommonModule, TrainSearchInputModule],
  providers: [provideRouter(trainSearchRoutes)]
})
export class TrainSearchModule {}
