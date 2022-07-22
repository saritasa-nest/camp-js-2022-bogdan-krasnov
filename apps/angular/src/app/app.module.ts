import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialExampleModule } from '../material/material.module';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeTableComponent } from './features/anime-table/anime-table.component';

/** App module. */
@NgModule({
  declarations: [AppComponent, AnimeTableComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, MaterialExampleModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
