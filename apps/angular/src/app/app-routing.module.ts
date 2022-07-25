import { NotFoundComponent } from './../shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeTableComponent } from './features/anime-table/anime-table.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeTableComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
