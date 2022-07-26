import { NotFoundComponent } from './../shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./features/anime/anime.module').then(
      m => m.AnimeModule,
    ),
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
