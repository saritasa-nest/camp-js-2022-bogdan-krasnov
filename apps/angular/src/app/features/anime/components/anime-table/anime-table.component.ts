import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { BehaviorSubject, Observable, switchMap, combineLatest, map, tap, debounceTime } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeType } from '@js-camp/core/utils/enums/table';

import { PaginationParams } from '../../../../../core/models/pagination-params';

import { AnimeService } from '../../../../../core/services/anime.service';

import { SearchParamsService } from './../../../../../core/services/search-params.service';

const DEBOUNCE_TIME = 500;
const PAGE_SIZE_DEFAULT = 5;
const INITIAL_PAGE = 0;
const DEFAULT_ANIME_COUNT = 0;
const ORDERING_DEFAULT = 'title_eng';
const DEFAULT_SEARCH_VALUE = '';

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

  /** Number of records per page. */
  public readonly pageSize$ = new BehaviorSubject(PAGE_SIZE_DEFAULT);

  /** Anime Search field value. */
  public searchValue = DEFAULT_SEARCH_VALUE;

  /** Count of anime taken from the request. */
  public readonly animeCount$ = new BehaviorSubject(DEFAULT_ANIME_COUNT);

  /** Index of the current page.  */
  public readonly pageIndex$ = new BehaviorSubject(INITIAL_PAGE);

  /** Sorting anime on the page. */
  public readonly pageSort$ = new BehaviorSubject(ORDERING_DEFAULT);

  /** Filtering by type on the page. */
  public readonly pageType$ = new BehaviorSubject([] as AnimeType[]);

  /** Filtering by anime name. */
  private readonly pageSearch$ = new BehaviorSubject(DEFAULT_SEARCH_VALUE);

  /** Anime types. */
  public readonly animeTypes = Object.values(AnimeType).filter(element => typeof element === 'string');

  public constructor(
    private readonly animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {
    this.animeList$ = combineLatest([
      this.pageType$,
      this.pageSearch$,
      this.pageSort$,
      this.pageIndex$,
      this.pageSize$,
    ]).pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap(([pageType, pageSearch, pageSort, pageIndex, pageSize]) => {
        const params = this.searchParamsService.changeSearchParams(new PaginationParams({
          page: pageIndex,
          size: pageSize,
          sort: pageSort,
          search: pageSearch,
          type: pageType,
        }));
        return this.animeService.getAnimeList(params).pipe(
          tap(animeList => this.animeCount$.next(animeList.count)),
          map(animeList => animeList.results),
        );
      }),
    );
  }

  /**
   * Changing the page numbering to the anime table.
   * @param event Paginator event.
   */
  public onPaginateChange(event: PageEvent): void {
    this.pageIndex$.next(event.pageIndex);
    this.pageSize$.next(event.pageSize);
  }

  /**
   * Anime filtering by type.
   * @param selectTypeValue Select type value.
   */
  public onFilterType(selectTypeValue: MatSelectChange): void {
    this.pageIndex$.next(INITIAL_PAGE);
    this.pageType$.next(selectTypeValue.value);
  }

  /**
   * Sort anime list.
   * @param sort Selected sorting.
   */
  public onSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === 'asc') {
      this.pageSort$.next(sort.active);
    } else {
      this.pageSort$.next(`-${sort.active}`);
    }
  }

  /** Searching input form controller. */
  public searchAnime(): void {
    this.pageIndex$.next(INITIAL_PAGE);
    this.pageSearch$.next(this.searchValue);
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
