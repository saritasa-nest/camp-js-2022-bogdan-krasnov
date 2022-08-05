import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { BehaviorSubject, Observable, switchMap, combineLatest, map, debounceTime } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeType } from '@js-camp/core/utils/enums/table';

import { INITIAL_PAGE, ORDERING_DEFAULT, PAGE_SIZE_DEFAULT } from '../../../../../core/constants/anime-table';

import { PaginationParams } from '../../../../../core/models/pagination-params';

import { AnimeService } from '../../../../../core/services/anime.service';

import { SearchParamsService } from './../../../../../core/services/search-params.service';

const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  pageIndex: INITIAL_PAGE,
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
export class AnimeTableComponent implements OnInit {

  /** Anime list. */
  public animeList$: Observable<readonly Anime[]>;

  /** Displayed columns. */
  public readonly displayedColumns = ['imageSrc', 'titleEnglish', 'titleJapanese', 'type', 'status', 'airedStart'] as const;

  /** Total number of records for the current query. */
  public readonly pageSize = DEFAULT_PAGINATION_PARAMS.pageSize;

  public readonly filterAnimeValue = '';

  /** Count of anime in the database.  */
  public animeCount = 0;

  /** Index of the current page.  */
  public readonly pageIndex$ = new BehaviorSubject(DEFAULT_PAGINATION_PARAMS.pageIndex);

  /** Sort anime. */
  public pageSort$ = new BehaviorSubject(DEFAULT_PAGINATION_PARAMS.sort);

  /** Filter anime value. */
  private readonly searchString$ = new BehaviorSubject('');

  /** Type anime values. */
  public pageType$ = new BehaviorSubject([] as AnimeType[]);

  /** Anime types. */
  public readonly animeTypes = Object.values(AnimeType).filter(element => typeof element === 'string');

  public constructor(
    private readonly animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {

    const { page = 0, sort = 'title_eng', search = '', type = [] } = this.searchParamsService.getAnimeListSearchParams();

    console.log(page, sort, search, type);

    this.pageIndex$.next(page);
    this.searchString$.next(search);
    this.pageSort$.next(sort);
    this.pageType$.next(type);

    this.animeList$ = combineLatest([
      this.pageType$,
      this.searchString$,
      this.pageSort$,
      this.pageIndex$,
    ]).pipe(
      debounceTime(500),
      switchMap(([pageType, searchString, pageSort, pageIndex]) => {
        const params = this.searchParamsService.changeSearchParams({
          pageIndex,
          pageSize: PAGE_SIZE_DEFAULT,
          sort: pageSort,
          filter: searchString,
          type: pageType,
        });
        console.log(params);
        return this.animeService.getAnimeList(params).pipe(
          map(animeList => {
            this.animeCount = animeList.count;
            return animeList.results;
          }),
        );
      }),
    );

  //   switchMap(pageIndex => this.animeService.getAnimeList({
  //     pageIndex: 0,
  //     pageSize: 5,
  //   })),
  //   map(animeList => {
  //     this.animeCount = animeList.count;
  //     return animeList.results;
  //   }),
  // );
  }

  public ngOnInit(): void {
    // this.animeList$ = route.queryParams.pipe(
    //   switchMap(params => animeService.getAnimeList(
    //     {
    //       pageIndex: params['pageIndex'],
    //       pageSize: params['pageSize'],
    //       sort: params['sort'],
    //       filter: params['filter'],
    //       type: params['type'],
    //     },
    //   )),
    //   map(animeList => {
    //     this.animeCount = animeList.count;
    //     return animeList.results;
    //   }),
    // );
  }

  /**
   * Changing the page numbering to the anime table.
   * @param event Paginator event.
   */
  public onPaginateChange(event: PageEvent): void {
    this.pageIndex$.next(event.pageIndex);
  }

  /**
   * Anime filtering by type.
   * @param select Select type value.
   */
  public filterType(select: MatSelectChange): void {
    this.pageIndex$.next(INITIAL_PAGE);
    this.pageType$.next(select.value);
  }

  /**
   * Sort anime list.
   * @param sort Selected sorting.
   */
  public sortAnimeList(sort: Sort): void {
    if (!sort.active || sort.direction === 'asc') {
      this.pageSort$.next(sort.active);
    } else {
      this.pageSort$.next(`-${sort.active}`);
    }
  }

  /**
   * Searching input form controller.
   * @param filterValue Filter value.
   */
  public filterAnime(filterValue: string): void {
    this.pageIndex$.next(INITIAL_PAGE);
    this.searchString$.next(filterValue);
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
