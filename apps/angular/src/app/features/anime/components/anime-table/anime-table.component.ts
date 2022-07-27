import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

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

  public constructor(animeService: AnimeService) {
    this.animeList$ = animeService.getAnimeList();
  }

   /**
   * Track by method.
   * @param index Index.
   * @param anime Anime.
   */
  public trackByAnimeId(index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }
}
