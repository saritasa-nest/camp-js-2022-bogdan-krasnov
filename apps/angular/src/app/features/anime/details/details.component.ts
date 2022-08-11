import { Anime } from '@js-camp/core/models/anime';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { map, Observable, switchMap } from 'rxjs';

import { AnimeService } from './../../../../core/services/anime.service';

/** Details component. */
@Component({
  selector: 'camp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  /** Anime id. */
  private readonly animeId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => params['id']),
  );

  /** Anime. */
  public readonly anime$: Observable<Anime> = this.animeId$.pipe(
    switchMap((userId: number) => this.animeService.getAnimeById(userId)),
  );

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly animeService: AnimeService,
  ) {
  }
}
