import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import axios, { AxiosInstance } from 'axios';

import { CURRENT_PAGE_DEFAULT, ORDERING_DEFAULT, SIZE_PAGE_DEFAULT } from '../constants/anime';

/**
 * Prepared data for axios.
 */
const apiAnime: AxiosInstance =
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Api-Key': import.meta.env.VITE_API_KEY,
    },
  });

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
  limit = SIZE_PAGE_DEFAULT,
  offset = ((currentPage - 1) * limit),
): Promise<Pagination<Anime>> {
  const response = await apiAnime.get(
    `/anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering.concat(',')}id`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
