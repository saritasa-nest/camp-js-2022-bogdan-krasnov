import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PaginationParams } from '../models/pagination-params';

/** Construct and redirecting by query search params. */
@Injectable({
  providedIn: 'root',
})
export class SearchParamsService {

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  /**
   * Creates search params for anime list GET query.
   * @param pagination Pagination params.
   */
  public changeSearchParams(pagination: PaginationParams): HttpParams {

    const newSearchParams = { ...pagination };

    const filteredNewSearchParams: Params = [];
    for (const [name, value] of Object.entries(newSearchParams)) {
      filteredNewSearchParams[name] = value;
    }

    this.router.navigate([], {
      queryParams: filteredNewSearchParams,
    });

    return new HttpParams({
      fromObject: filteredNewSearchParams,
    });
  }

  /** Gets search params from browser address string. */
  public getAnimeListSearchParams(): Params {
    const { queryParams } = this.route.snapshot;
    return queryParams;
  }
}
