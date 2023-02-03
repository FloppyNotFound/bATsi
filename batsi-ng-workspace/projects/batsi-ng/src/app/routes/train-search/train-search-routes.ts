import { TrainDetailsComponent } from './train-details/train-details.component';
import { Routes } from '@angular/router';
import { StationListResolver } from '../../resolvers/station-list.resolver';
import { TrainSearchComponent } from './train-search.component';

const trainSearchRoutes: Routes = [
  {
    path: '',
    component: TrainSearchComponent,
    resolve: {
      stations: StationListResolver
    }
  },
  {
    path: 'details',
    component: TrainDetailsComponent
  }
];

export { trainSearchRoutes };
