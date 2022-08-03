import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialExampleModule } from 'apps/angular/src/material/material.module';

import { AnimeRoutingModule } from './anime.routing';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeComponent } from './anime.component';
import { FormsModule } from '@angular/forms';

/** Table view module. */
@NgModule({
  declarations: [AnimeComponent, AnimeTableComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    MaterialExampleModule,
    FormsModule,
  ],
})
export class AnimeModule { }
