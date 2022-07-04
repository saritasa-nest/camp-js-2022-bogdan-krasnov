import axios, { AxiosInstance } from 'axios';

import { SIZE_PAGE } from '../constants/anime';

import { IAnimeResponse } from '../types/anime';

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
): Promise<IAnimeResponse> {
  const response = await http.get(
    `/anime/anime/?limit=${SIZE_PAGE}&offset=${(currentPage - 1) * SIZE_PAGE}&ordering=id`,
  );
  const { data } = response;
  return data;
}

// ordering: string,
