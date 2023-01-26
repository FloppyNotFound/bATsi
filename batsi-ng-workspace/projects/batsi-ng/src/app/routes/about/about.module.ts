import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { aboutRoutes } from './about-routes';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [provideRouter(aboutRoutes)]
})
export class AboutModule {}
