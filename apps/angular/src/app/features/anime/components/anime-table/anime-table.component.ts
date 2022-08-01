import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { Observable, switchMap } from 'rxjs';

import { CURRENT_PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from 'apps/angular/src/core/constants/anime-table';

import { AnimeService } from '../../../../../core/services/anime.service';

const DEFAULT_ANIME_PARAMS = {
  paginationParams: {
    page: CURRENT_PAGE_DEFAULT,
    limit: PAGE_SIZE_DEFAULT,
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
  public readonly pageSize = PAGE_SIZE_DEFAULT;

  /** Index of the current page.  */
  public readonly pageIndex = 0;

  public constructor(
    animeService: AnimeService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.router.navigate([], {
      queryParams: { ...DEFAULT_ANIME_PARAMS, ...route.snapshot.queryParams },
    });
    this.animeList$ = route.queryParams.pipe(
      switchMap(params => animeService.getAnimeList(params['pageIndex'], params['pageSize'])),
    );
  }

  /**
   * Apply pagination to anime table.
   * @param event Paginator event.
   */
  public onPaginateChange(event: PageEvent): void {
    this.updateQueryParams({ page: event.pageIndex, limit: event.pageSize });
  }

  private updateQueryParams(paginationParams: PaginationParams): void {
    this.router.navigate([], {
      queryParams: {
        pageIndex: paginationParams.page,
        pageSize: paginationParams.limit,
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Track anime by ID.
   * @param _index Index.
   * @param anime Anime.
   */
  public trackByAnimeId(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }
}
