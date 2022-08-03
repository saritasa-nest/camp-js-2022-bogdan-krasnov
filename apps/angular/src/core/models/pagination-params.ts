/** Anime params. */
export interface PaginationParams {

  /** Actual page. */
  pageIndex: number;

  /** Limit elements to display on a page. */
  pageSize: number;

  /** The field by which to sort. */
  sort?: string;

  filter?: string;

  type?: string;
}
