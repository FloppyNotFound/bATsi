import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStateStackModule } from 'ngx-state-stack';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { initializeStationList } from './initializers/initialize-station-list';
import { StationListService } from './services/station-list/station-list.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgxStateStackModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeStationList,
      deps: [StationListService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
