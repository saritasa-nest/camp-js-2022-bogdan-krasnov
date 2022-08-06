import { Immerable, OmitImmerable } from '@js-camp/core/models/immerable';
import { AnimeType } from '@js-camp/core/utils/enums/table';

/** Anime params. */
export class PaginationParams extends Immerable {

  /** Actual page. */
  public readonly page: number;

  /** Limit elements to display on a page. */
  public readonly size: number;

  /** The field by which to sort. */
  public readonly sort?: string;

  /** The field by which to filter. */
  public readonly search?: string;

  /** The field by which to filter by type. */
  public readonly type?: AnimeType[];

  public constructor(data: InitArgs) {
    super();
    this.page = data.page;
    this.size = data.size;
    this.sort = data.sort;
    this.type = data.type;
    this.search = data.search;
  }
}

type InitArgs = OmitImmerable<PaginationParams>;
