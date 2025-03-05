import { Routes } from '@angular/router';
import { Type } from '@angular/core';

const aboutRoutes: Routes = [
  {
    path: '',
    loadComponent: (): Promise<Type<unknown>> => import('./about.component').then(c => c.AboutComponent),
    data: { title: 'Impressum' },
  },
];

export { aboutRoutes };
