import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';

import { ORDERING_DEFAULT, PAGE_SIZE_DEFAULT } from '../constants/anime-table';

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

  /** Reception with a configured URL. */
  public getAnimeList(): Observable<Anime[]> {
    const response$ = this.http.get<PaginationDto<AnimeDto>>(this.animeListUrl.toString(), {
      params: new HttpParams()
        .set('limit', PAGE_SIZE_DEFAULT)
        .set('ordering', ORDERING_DEFAULT),
    });

    return response$.pipe(
      map(animeDto => animeDto.results.map(anime => AnimeMapper.fromDto(anime))),
    );
  }
}
