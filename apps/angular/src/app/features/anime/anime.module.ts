import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material/material.module';

import { AnimeRoutingModule } from './anime.routing';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeComponent } from './anime.component';

/** Table view module. */
@NgModule({
  declarations: [AnimeComponent, AnimeTableComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AnimeModule { }
