import { Status, Type } from '@js-camp/core/models/anime';

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
  readonly type: Type;

  /** Anime status. */
  readonly status: Status;

  /** Anime aired. */
  readonly aired: AiredDto;
}

/** Interface for the aired. */
interface AiredDto {

  /** Aired start. */
  readonly start: Date;

  /** Aired end. */
  readonly end: Date;
}

