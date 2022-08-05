import { AnimeType } from '@js-camp/core/utils/enums/table';

/** Anime params. */
export interface PaginationParams {

  /** Actual page. */
  page: number;

  /** Limit elements to display on a page. */
  size: number;

  /** The field by which to sort. */
  sort?: string;

  /** The field by which to filter. */
  filter?: string;

  /** The field by which to filter by type. */
  type?: AnimeType[];
}
