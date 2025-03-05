import { Routes } from '@angular/router';
import { aboutRoutes } from './routes/about/about.routes';
import { Type } from '@angular/core';
import { stationsResolver } from './resolvers/stations.resolver';
import { canActivateTrainDetailsGuard } from './guards/can-activate-train-details.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'train-search',
    pathMatch: 'full',
  },
  {
    path: 'train-search',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: (): Promise<Type<unknown>> =>
          import('./routes/train-search/train-search.component').then(c => c.TrainSearchComponent),
        data: { title: 'Zugsuche' },
        resolve: {
          stations: stationsResolver,
        },
      },
      {
        path: 'details',
        loadComponent: (): Promise<Type<unknown>> =>
          import('./routes/train-details/train-details.component').then(c => c.TrainDetailsComponent),
        canActivate: [canActivateTrainDetailsGuard],
      },
    ],
  },
  {
    path: 'about',
    children: aboutRoutes,
  },
  {
    path: '**',
    redirectTo: 'train-search',
  },
];
