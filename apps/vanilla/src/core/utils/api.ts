import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import axios, { AxiosInstance } from 'axios';

import { SIZE_PAGE } from '../constants/anime';

/**
 * Prepared data for axios.
 */
const http: AxiosInstance =
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Api-Key': import.meta.env.VITE_API_KEY,
    },
  });

/**
 * Reception function with a configured URL.
 * @param sizePage Size page.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 */
export async function apiAnimeTable(
  currentPage = 1,
  sizePage = SIZE_PAGE,
  ordering = '',
): Promise<Pagination<Anime>> {
  const response = await http.get(
    `/anime/anime/?limit=${sizePage}&offset=${(currentPage - 1) * sizePage}&ordering=${ordering},id`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
