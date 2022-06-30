
/** Interface for the anime. */
export interface IAnime {

  /** Anime id. */
  readonly id: number;

  /** Anime picture. */
  image: string;

  /** Anime title in english. */
  title_eng: string;

  /** The name of the anime in Japanese. */
  title_jpn: string;

  /** Anime type. */
  type: string;

  /** Anime status. */
  status: string;
}

/** Interface for the anime response. */
export interface IAnimeResponse {
  count: number;
  next: string;
  previous?: string;

  /** List of anime. */
  results: IAnime[];
}
