import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateGuard } from 'ngx-state-stack';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'train-search',
    pathMatch: 'full'
  },
  {
    path: 'train-search',
    loadChildren: () =>
      import('./routes/train-search/train-search.module').then(
        m => m.TrainSearchModule
      ),
    data: { title: 'Zugsuche' },
    canActivateChild: [StateGuard]
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./routes/about/about.module').then(m => m.AboutModule),
    data: { title: 'Impressum' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
