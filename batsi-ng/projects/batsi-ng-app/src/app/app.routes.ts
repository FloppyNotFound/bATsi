import { Routes } from '@angular/router';
import { trainSearchRoutes } from './routes/train-search/train-search-routes';
import { aboutRoutes } from './routes/about/about.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'train-search',
    pathMatch: 'full',
  },
  {
    path: 'train-search',
    children: trainSearchRoutes,
  },
  {
    path: 'about',
    children: aboutRoutes,
  },
];
