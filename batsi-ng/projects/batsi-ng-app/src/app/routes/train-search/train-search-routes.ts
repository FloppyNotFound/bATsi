import { Routes } from '@angular/router';
import { Type } from '@angular/core';
import { stationsResolver } from './resolvers/stations.resolver';

const trainSearchRoutes: Routes = [
  {
    path: '',
    loadComponent: (): Promise<Type<unknown>> => import('./train-search.component').then(c => c.TrainSearchComponent),
    data: { title: 'Zugsuche' },
    resolve: {
      stations: stationsResolver,
    },
  },
];

export { trainSearchRoutes };
