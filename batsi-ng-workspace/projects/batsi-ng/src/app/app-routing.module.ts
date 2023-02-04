import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    data: { title: 'Zugsuche' }
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./routes/about/about.module').then(m => m.AboutModule),
    data: { title: 'Impressum' }
  },
  {
    path: '**',
    redirectTo: 'train-search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
