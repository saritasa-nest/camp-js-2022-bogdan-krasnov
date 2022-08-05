import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';

import { BehaviorSubject, Observable, switchMap, combineLatest } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeType } from '@js-camp/core/utils/enums/table';

import { Pagination } from '@js-camp/core/models/pagination';

import { FIRST_PAGE as INITIAL_PAGE, ORDERING_DEFAULT, PAGE_SIZE_DEFAULT } from '../../../../../core/constants/anime-table';

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
  public animeList$: Observable<Pagination<Anime>>;

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
  public sort$ = new BehaviorSubject(DEFAULT_PAGINATION_PARAMS.sort);

  /** Filter anime value. */
  private readonly searchString$ = new BehaviorSubject('');

  /** Type anime values. */
  public type$ = new BehaviorSubject([] as AnimeType[]);

  /** Anime types. */
  public readonly animeTypes = Object.values(AnimeType).filter(element => typeof element === 'string');

  public constructor(
    private readonly animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {

    const { pageIndex, sort, filter, type } = this.searchParamsService.getAnimeListSearchParams();

    this.pageIndex$.next(pageIndex);
    this.searchString$.next(filter);
    this.sort$.next(sort);
    this.type$.next(type);

    const resetPaginationChanges$ = combineLatest([
      this.type$,
      this.searchString$,
      this.sort$,
    ])

    this.animeList$ = resetPaginationChanges$.pipe(
      switchMap(([type, searchString, sort]) => {
        const params = this.searchParamsService.changeSearchParams({
          pageIndex: INITIAL_PAGE,
          pageSize: PAGE_SIZE_DEFAULT,
          sort,
          filter: searchString,
          type,
        });
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

    // const resetPaginationSideEffect$ = this.searchString$.pipe(
    //   tap(() => this.pageIndex$.next(INITIAL_PAGE)),
    // );
    // merge(
    //   resetPaginationSideEffect$,
    // ).subscribe();

    // this.router.navigate([], {
    //   queryParams: { ...DEFAULT_PAGINATION_PARAMS, ...route.snapshot.queryParams },
    // });
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
    this.type$.next(select.value);
  }

  /**
   * Sort anime list.
   * @param sort Selected sorting.
   */
  public sortAnimeList(sort: Sort): void {
    if (!sort.active || sort.direction === 'asc') {
      this.sort$.next(sort.active);
    } else {
      this.sort$.next(`-${sort.active}`);
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
