import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { map, Observable, switchMap } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeType } from '@js-camp/core/utils/enums/table';

import { FIRST_PAGE, ORDERING_DEFAULT, PAGE_SIZE_DEFAULT } from '../../../../../core/constants/anime-table';

import { PaginationParams } from '../../../../../core/models/pagination-params';

import { AnimeService } from '../../../../../core/services/anime.service';

const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  pageIndex: 0,
  pageSize: PAGE_SIZE_DEFAULT,
  sort: ORDERING_DEFAULT,
  filter: '',
};

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
  public readonly pageSize = DEFAULT_PAGINATION_PARAMS.pageSize;

  /** Count of anime in the database.  */
  public animeCount = 0;

  /** Index of the current page.  */
  public pageIndex = DEFAULT_PAGINATION_PARAMS.pageIndex;

  /** Sort anime. */
  public sort = DEFAULT_PAGINATION_PARAMS.sort;

  /** Filter anime value. */
  public filterAnimeValue = '';

  /** Type anime values. */
  public typeAnimeValues: AnimeType[] = [];

  /** Anime types. */
  public readonly animeTypes = Object.values(AnimeType).filter(element => typeof element === 'string');

  public constructor(
    animeService: AnimeService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.router.navigate([], {
      queryParams: { ...DEFAULT_PAGINATION_PARAMS, ...route.snapshot.queryParams },
    });
    this.animeList$ = route.queryParams.pipe(
      switchMap(params => animeService.getAnimeList(
        {
          pageIndex: params['pageIndex'],
          pageSize: params['pageSize'],
          sort: params['sort'],
          filter: params['filter'],
          type: params['type'],
        },
      )),
      map(animeList => {
        this.animeCount = animeList.count;
        return animeList.results;
      }),
    );
  }

  /**
   * Changing the page numbering to the anime table.
   * @param event Paginator event.
   */
  public onPaginateChange(event: PageEvent): void {
    this.updateQueryParams({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      sort: this.sort,
      filter: this.filterAnimeValue,
      type: this.typeAnimeValues,
    });
    this.pageIndex = event.pageIndex;
  }

  /**
   * Anime filtering by type.
   * @param select Select type value.
   */
  public filterType(select: MatSelectChange): void {
    this.updateQueryParams({
      pageIndex: FIRST_PAGE,
      pageSize: this.pageSize,
      filter: this.filterAnimeValue,
      sort: this.sort,
      type: select.value,
    });
    this.typeAnimeValues = select.value;
  }

  /**
   * Sort anime list.
   * @param sort Selected sorting.
   */
  public sortAnimeList(sort: Sort): void {
    if (!sort.active || sort.direction === 'asc') {
      this.sort = sort.active;
    } else {
      this.sort = `-${sort.active}`;
    }
    this.updateQueryParams({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sort: this.sort,
      filter: this.filterAnimeValue,
      type: this.typeAnimeValues,
    });
  }

  /**
   * Searching input form controller.
   * @param filterValue Filter value.
   */
  public filterAnime(filterValue: string): void {
    this.pageIndex = FIRST_PAGE;
    this.filterAnimeValue = filterValue;
    this.updateQueryParams({
      pageIndex: FIRST_PAGE,
      pageSize: this.pageSize,
      sort: this.sort,
      filter: this.filterAnimeValue,
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
        filter: paginationParams.filter,
        type: paginationParams.type,
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
