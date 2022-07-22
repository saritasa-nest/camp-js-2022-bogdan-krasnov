import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  public constructor(private http: HttpClient) { }

  /** Reception with a configured URL. */
  public getAnimeList(): Observable<Anime[]> {
    const response$ = this.http.get<PaginationDto<AnimeDto>>('https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?', {
      params: new HttpParams()
        .set('limit', '5')
        .set('ordering', 'id'),
    });

    return response$.pipe(
      map(data => data.results.map(anime => AnimeMapper.fromDto(anime))),
    );
  }
}
