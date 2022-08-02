import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { ORDERING_DEFAULT, PAGE_SIZE_DEFAULT } from '../../../../../core/constants/anime-table';

import { PaginationParams } from '../../../../../core/models/pagination-params';

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

  /** Anime list. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Displayed columns. */
  public readonly displayedColumns = ['imageSrc', 'titleEnglish', 'titleJapanese', 'type', 'status', 'airedStart'] as const;

  /** Total number of records for the current query. */
  public readonly pageSize = PAGE_SIZE_DEFAULT;

  /** Count of anime in the database.  */
  public animeCount = 0;

  /** Index of the current page.  */
  public readonly pageIndex$ = new BehaviorSubject<number>(0);

  /** Sort anime. */
  public pageSort = ORDERING_DEFAULT;

  public constructor(
    animeService: AnimeService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.router.navigate([], {
      queryParams: { ...route.snapshot.queryParams },
    });
    this.animeList$ = route.queryParams.pipe(
      switchMap(params => animeService.getAnimeList(
        { pageIndex: params['pageIndex'], pageSize: params['pageSize'], sort: params['sort'] },
      )),
      map(animeList => {
        this.animeCount = animeList.count;
        return animeList.results;
      }),
    );
  }

  /**
   * Apply pagination to anime table.
   * @param event Paginator event.
   */
  public onPaginateChange(event: PageEvent): void {
    this.updateQueryParams({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      sort: this.pageSort,
    });
  }

  /**
   * Sort anime list.
   * @param sort Selected sorting.
   */
  public sortAnimeList(sort: Sort): void {
    if (!sort.active || sort.direction === 'asc') {
      this.pageSort = sort.active;
    } else {
      this.pageSort = `-${sort.active}`;
    }
    this.updateQueryParams({
      pageIndex: 0,
      pageSize: this.pageSize,
      sort: this.pageSort,
    });
  }

  /**
   * Update query params.
   * @param paginationParams Paginator .
   */
  private updateQueryParams(paginationParams: PaginationParams): void {
    this.router.navigate([], {
      queryParams: {
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize,
        sort: paginationParams.sort,
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
