import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { FIRST_PAGE, PAGE_SIZE_DEFAULT } from '../constants/anime';
import { Ordering } from '../enums/table';
import { apiAnime } from './axiosInstance';

/**
 * Parameters for getting data from the database.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 * @param limit Size page.
 */
export interface PaginationConfig {

  /** The number of results returned per page. */
  readonly currentPage: number;

  /** Ordering page. */
  readonly ordering?: Ordering;

  /** Limit page. */
  readonly limit?: number;


}

const configDefault = {
  currentPageDefault: FIRST_PAGE,
  orderingDefault: Ordering.None,
  limitDefault: PAGE_SIZE_DEFAULT,
};

/**
 * Reception with a configured URL.
 * @param paginationConfig Parameters for getting anime from the database.
 */
export async function getAnimeData(paginationConfig: PaginationConfig): Promise<Pagination<Anime>> {
  const { currentPageDefault, orderingDefault, limitDefault } = configDefault;
  const { currentPage = currentPageDefault, ordering = orderingDefault, limit = limitDefault } = paginationConfig;
  const offset = (currentPage - 1) * limit;

  const queryParams = new URLSearchParams([]);
  queryParams.append('limit', String(limit));
  queryParams.append('offset', String(offset));
  queryParams.append('ordering', `${ordering},id`);

  const urlAnime = queryParams.toString();
  const response = await apiAnime.get<PaginationDto<AnimeDto>>(
    `/anime/anime/?${urlAnime}`,
  );
  return PaginationMapper.fromDto(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}
