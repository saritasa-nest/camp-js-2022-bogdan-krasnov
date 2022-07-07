import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { CURRENT_PAGE_DEFAULT, ORDERING_DEFAULT, PAGE_SIZE_DEFAULT } from '../constants/anime';
import { apiAnime } from './axiosInstance';

/**
 * Reception function with a configured URL.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 * @param limit Size page.
 * @param offset Offset page.
 */
export async function getAnimeData(
  currentPage = CURRENT_PAGE_DEFAULT,
  ordering = ORDERING_DEFAULT,
  limit = PAGE_SIZE_DEFAULT,
  offset = ((currentPage - 1) * limit),
): Promise<Pagination<Anime>> {
  const response = await apiAnime.get(
    `/anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering.concat(',')}id`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
