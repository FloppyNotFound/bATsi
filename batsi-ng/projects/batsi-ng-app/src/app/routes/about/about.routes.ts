import { Type } from '@angular/core';
import { Routes } from '@angular/router';

const aboutRoutes: Routes = [
  {
    path: '',
    loadComponent: (): Promise<Type<unknown>> => import('./about.component').then(c => c.AboutComponent),
    data: { title: 'Impressum' },
  },
];

export { aboutRoutes };
