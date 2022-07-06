import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import axios, { AxiosInstance } from 'axios';

import { SIZE_PAGE_DEFAULT } from '../constants/anime';

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
 * @param limit Size page.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 */
export async function getAnimeData(
  currentPage = 1,
  ordering: string = '',
  limit = SIZE_PAGE_DEFAULT,
  offset = ((currentPage - 1) * limit)
): Promise<Pagination<Anime>> {
  const response = await apiAnime.get(
    `/anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering + ','}id`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
