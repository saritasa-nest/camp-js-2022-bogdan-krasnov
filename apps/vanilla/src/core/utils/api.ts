import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { CURRENT_PAGE_DEFAULT, Ordering, PAGE_SIZE_DEFAULT } from '../constants/anime';

import { apiAnime } from './axiosInstance';

/** Parameters for getting anime from the database.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 * @param limit Size page.
 */
interface PaginationConfig {

  /** The number of results returned per page. */
  readonly currentPage: number;

  /** Current page. */
  readonly ordering: Ordering;

  /** Sorting mode. */
  readonly limit: number;
}

/**
 * Reception function with a configured URL.
 * @param paginationConfig Parameters for getting anime from the database.
 */
export async function getAnimeData(paginationConfig: PaginationConfig): Promise<Pagination<Anime>> {
  const { currentPage = CURRENT_PAGE_DEFAULT, ordering = Ordering.None, limit = PAGE_SIZE_DEFAULT } = paginationConfig;
  const offset = (currentPage - 1) * paginationConfig.limit;
  const urlAnime = new URLSearchParams(`limit=${limit}&offset=${offset}&ordering=${ordering.concat(',')}id`);
  const response = await apiAnime.get(
    `/anime/anime/?${urlAnime}`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
