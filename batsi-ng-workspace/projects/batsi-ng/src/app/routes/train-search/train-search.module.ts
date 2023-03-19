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
import { TrainTimeTableInfoReportedScheduledComponent } from './train-details/components/train-time-table-info/train-time-table-info-reported-scheduled/train-time-table-info-reported-scheduled.component';
import { IsTimetableScheduledEqualReportedPipe } from './train-details/components/train-time-table-info/train-time-table-info-reported-scheduled/pipes/is-timetable-scheduled-equal-reported.pipe';
import { ToTimeStringPipe } from './train-details/components/train-time-table-info/pipes/to-time-string.pipe';
import { TrainWagonFilterFormComponent } from './train-details/components/train-wagon-filter-form/train-wagon-filter-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrainSearchComponent,
    TrainDetailsComponent,
    TrainWagonComponent,
    WagonLoadRatioPipe,
    TrainTimeTableInfoComponent,
    IsTimetableScheduledEqualReportedPipe,
    TrainTimeTableInfoReportedScheduledComponent,
    ToTimeStringPipe,
    TrainWagonFilterFormComponent
  ],
  imports: [CommonModule, TrainSearchInputModule, ReactiveFormsModule],
  providers: [provideRouter(trainSearchRoutes)]
})
export class TrainSearchModule {}
