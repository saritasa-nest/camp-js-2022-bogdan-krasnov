import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable } from 'rxjs';

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
export class AnimeTableComponent {

  /** Anime. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Displayed columns. */
  public readonly displayedColumns = ['imageSrc', 'titleEnglish', 'titleJapanese', 'type', 'status', 'airedStart'] as const;

  /** Total number of records for the current query. */
  public animeListCount = 100;

  /** Current page number. */
  public readonly currentPage$ = new BehaviorSubject<number>(0);

  public constructor(private animeService: AnimeService) {
    this.animeList$ = this.animeService.getAnimeList(this.currentPage$.value, 5);
  }

  public onPaginateChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    this.currentPage$.next(page)
  }

   /**
   * Track anime by ID
   * @param _index Index.
   * @param anime Anime.
   */
  public trackByAnimeId(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }
}
