import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeComponent } from './anime.component';
import { AnimeRoutingModule } from './anime.routing';
import { MaterialExampleModule } from 'apps/angular/src/material/material.module';

/** Table view module. */
@NgModule({
  declarations: [AnimeComponent, AnimeTableComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    MaterialExampleModule,
  ],
})
export class AnimeModule { }
