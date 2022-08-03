import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { PaginationParams } from './../models/pagination-params';

import { AppConfigService } from './app-config.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(appConfig: AppConfigService, private readonly http: HttpClient) {
    this.animeListUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  /** Reception with a configured URL.
   * @param params Anime params.
   */
  public getAnimeList(params: PaginationParams): Observable<Pagination<Anime>> {
    const offset = params.pageIndex * params.pageSize;
    console.log(params.pageIndex, params.pageSize, params.sort);
    return this.http.get<PaginationDto<AnimeDto>>(this.animeListUrl.toString(), {
      params: new HttpParams()
        .set('limit', params.pageSize)
        .set('offset', String(offset))
        .set('ordering', `${params.sort},id`)
        .set('title_eng__icontains', params.filter || ''),
    }).pipe(
      map(pagination => PaginationMapper.fromDto(
        pagination,
        animeDto => AnimeMapper.fromDto(animeDto),
      )),
    );
  }
}
