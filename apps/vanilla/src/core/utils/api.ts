import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { FIRST_PAGE, PAGE_SIZE_DEFAULT } from '../constants/anime';

import { Ordering } from '../enums/table';

import { apiAnime } from './axiosInstance';

/** Parameters for getting anime from the database.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 * @param limit Size page.
 */
export interface PaginationConfig {

  /** The number of results returned per page. */
  readonly currentPage: number;

  /** Current page. */
  readonly ordering?: Ordering;

  /** Limit page. */
  readonly limit?: number;
}

const configDefault = {
  currentPage: FIRST_PAGE,
  ordering: Ordering.None,
  limit: PAGE_SIZE_DEFAULT,
};

/**
 * Reception function with a configured URL.
 * @param paginationConfig Parameters for getting anime from the database.
 */
export async function getAnimeData(paginationConfig: PaginationConfig): Promise<Pagination<Anime>> {
  const {
    currentPage = configDefault.currentPage,
    ordering = configDefault.ordering,
    limit = configDefault.limit,
  } = paginationConfig;
  const offset = (currentPage - 1) * limit;
  const urlAnime = `limit=${limit}&offset=${offset}&ordering=${ordering.concat(',')}id`;
  const response = await apiAnime.get<PaginationDto<AnimeDto>>(
    `/anime/anime/?${urlAnime}`,
  );
  return PaginationMapper.fromDto(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}
