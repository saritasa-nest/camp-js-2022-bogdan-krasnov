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
  public readonly titleEng: string;

  /** The name of the anime in Japanese. */
  public readonly titleJpn: string;

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
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.type = data.type;
    this.status = data.status;
    this.aired = data.aired;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
