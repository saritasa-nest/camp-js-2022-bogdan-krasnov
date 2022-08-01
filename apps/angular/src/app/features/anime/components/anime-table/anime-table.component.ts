import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../../core/services/anime.service';
import { Observable, switchMap } from 'rxjs';

const DEFAULT_ANIME_PARAMS = {
  paginationParams: {
    page: 1,
    limit: 10,
  },
} as const;

/** Pagination params. */
export interface PaginationParams {

  /** Actual page. */
  readonly page: number;

  /** Limit elements to display on a page. */
  readonly limit: number;
}

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
  public readonly animeCount = 0;

  /** Current page.  */
  public readonly currentPage = 25;

  public constructor(
    private animeService: AnimeService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.router.navigate([], {
      queryParams: {...DEFAULT_ANIME_PARAMS, ...route.snapshot.queryParams},
    })
    this.animeList$ = route.queryParams.pipe(
      switchMap(params => this.animeService.getAnimeList(params['currentPage'], params['pageSize'])),
    )
  }

    /**
   * Apply pagination to anime table.
   * @param event Paginator event.
   */
  public onPaginateChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.updateQueryParams({ page: event.pageIndex, limit: event.pageSize });
  }

  private updateQueryParams(paginationParams: PaginationParams): void {
    this.router.navigate([], {
      queryParams: {
        'currentPage': paginationParams.page,
        'pageSize': paginationParams.limit,
      },
      queryParamsHandling: 'merge',
    });
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
