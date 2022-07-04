
/** Interface for the anime. */
export interface AnimeDto {

  /** Anime id. */
  readonly id: number;

  /** Anime picture. */
  readonly image: string;

  /** Anime title in english. */
  readonly title_eng: string;

  /** The name of the anime in Japanese. */
  readonly title_jpn: string;

  /** Anime type. */
  readonly type: string;

  /** Anime status. */
  readonly status: string;

  /** Anime aired. */
  readonly aired: AiredDto;
}

interface AiredDto {
  readonly start: string | null;
  readonly end: string | null;
}

// /** Interface for the anime response. */
// export interface AnimeResponseDto {

//   /** Number of anime. */
//   readonly count: number;

//   /** Link to the next anime page. */
//   readonly next: string;

//   /** Link to the next anime page. */
//   readonly previous: string;

//   /** List of anime. */
//   readonly results: readonly AnimeDto[];
// }
