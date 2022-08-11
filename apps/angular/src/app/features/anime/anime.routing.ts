import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from '../../../core/guards/authorized.guard';

import { AnimeComponent } from './anime.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
    canActivate: [AuthorizedGuard],
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
