import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { BehaviorSubject, switchMap, Observable, tap } from 'rxjs';

import { AnimeService } from '../../../../../core/services/anime.service';

/**
 * Anime table component.
 */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {

  /** Anime. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Whether books are loading or not. */
  public readonly isAnimeLoading$ = new BehaviorSubject<boolean>(false);

  /** Displayed columns. */
  public displayedColumns: string[] = ['imageSrc', 'titleEnglish', 'type', 'status'];

  private readonly animeUpdated$ = new BehaviorSubject<void>(void 0);

  public constructor(animeService: AnimeService) {
    this.animeList$ = this.animeUpdated$.pipe(
      tap(() => this.isAnimeLoading$.next(true)),
      switchMap(() => animeService.getAnimeList()),
      tap(() => this.isAnimeLoading$.next(false)),
    );
  }

  /** On init. */
  public ngOnInit(): void {
    this.animeList$.pipe(
      tap(anime => console.log(anime)),
    ).subscribe();
  }
}
