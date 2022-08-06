import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

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
  public getAnimeList(params: HttpParams): Observable<Pagination<Anime>> {
    return this.http.get<PaginationDto<AnimeDto>>(this.animeListUrl.toString(),
      {
        params,
      }).pipe(
      map(pagination => PaginationMapper.fromDto(
        pagination,
        animeDto => AnimeMapper.fromDto(animeDto),
      )),
    );
  }
}
