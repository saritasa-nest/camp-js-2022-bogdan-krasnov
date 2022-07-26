import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppConfigService } from '../core/services/app-config.service';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ApiInterceptor } from './../core/interceptors/ApiInterceptor';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  },
];

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AppConfigService,
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
