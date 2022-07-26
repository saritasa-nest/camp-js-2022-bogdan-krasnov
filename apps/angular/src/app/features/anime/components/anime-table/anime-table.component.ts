import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  /** Whether books are loading or not. */
  public readonly isAnimeLoading$ = new BehaviorSubject<boolean>(false);

  /** Displayed columns. */
  public readonly displayedColumns: string[] = ['imageSrc', 'titleEnglish', 'titleJapanese', 'type', 'status', 'airedStart'];

  public constructor(animeService: AnimeService) {
    this.animeList$ = animeService.getAnimeList();
  }
}
