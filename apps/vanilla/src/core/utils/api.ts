import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import axios, { AxiosInstance } from 'axios';

import { SIZE_PAGE } from '../constants/anime';

const API_KEY = 'be606d33-4ab6-4a82-9567-83cac4106e09';

/**
 * Prepared data for axios.
 */
const http: AxiosInstance =
  axios.create({
    baseURL: 'https://api.camp-js.saritasa.rocks/api/v1',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Api-Key': API_KEY,
    },
  });

/**
 * Reception function with a configured URL.
 * @param currentPage Current Page.
 */
export async function apiAnimeTable(
  currentPage = 1,
  ordering = '',
): Promise<Pagination<Anime>> {
  const response = await http.get(
    `/anime/anime/?limit=${SIZE_PAGE}&offset=${(currentPage - 1) * SIZE_PAGE}&ordering=${ordering},id`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}

