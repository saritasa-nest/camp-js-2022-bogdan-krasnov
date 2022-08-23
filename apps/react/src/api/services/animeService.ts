import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListSearchParams } from '@js-camp/core/models/anime-list-search-params';

import { httpClient } from '..';

/** Anime API. */
export namespace AnimeService {
  const ANIME_URL = 'anime/anime/';

  const defaultSearchParams = new URLSearchParams({
    limit: '10',
    offset: '0',
    ordering: 'id',
  });

  /**
   * Get anime list.
   * @param animeListSearchParams Anime list parameters.
   */
  export async function getAnimeList(animeListSearchParams: AnimeListSearchParams): Promise<readonly Anime[]> {
    const { data } = await httpClient.get<PaginationDto<AnimeDto>>(ANIME_URL, {
      params: defaultSearchParams,
    });
    const animeList = PaginationMapper.fromDto(
      data,
      animeDto => AnimeMapper.fromDto(animeDto),
    );
    return animeList.results;
  }
}
