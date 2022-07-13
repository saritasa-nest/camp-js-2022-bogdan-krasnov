import { Immerable, OmitImmerable } from './immerable';

/** Possible options anime type. */
enum AnimeType {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible options anime status. */
enum AnimeStatus {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Anime. */
export class Anime extends Immerable {

  /** Id anime. */
  public readonly id: number;

  /** Anime picture. */
  public readonly image: string;

  /** Anime title in english. */
  public readonly titleEnglish: string;

  /** The name of the anime in Japanese. */
  public readonly titleJapanese: string;

  /** Anime type. */
  public readonly type: AnimeType;

  /** Anime status. */
  public readonly status: AnimeStatus;

  /** Anime aired. */
  public readonly aired: {

    /** Aired start. */
    readonly start: Date;

    /** Aired end. */
    readonly end: Date;
  };

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
    this.status = data.status;
    this.aired = data.aired;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
