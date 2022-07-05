import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import axios, { AxiosInstance } from 'axios';

import { ORDERING_DEFAULT, SIZE_PAGE_DEFAULT } from '../constants/anime';

/**
 * Prepared data for axios.
 * @todo watch AxiosInstance from others.
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
 * @param sizePage Size page.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 */
export async function animeResponseData(
  currentPage = 1,
  sizePage = SIZE_PAGE_DEFAULT,
  ordering = ORDERING_DEFAULT,
): Promise<Pagination<Anime>> {
  const response = await apiAnime.get(
    `/anime/anime/?limit=${sizePage}&offset=${(currentPage - 1) * sizePage}&ordering=${ordering},id`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
