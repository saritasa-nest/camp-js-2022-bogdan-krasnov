import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Id. */
  public readonly id: number | undefined;

  /** Image. */
  public readonly image: string;

  /** TitleEng. */
  public readonly titleEng: string;

  /** TitleJpn. */
  public readonly titleJpn: string;

  /** Type. */
  public readonly type: string;

  /** Status. */
  public readonly status: string;

  /** Aired. */
  public readonly aired: {

    /** Start. */
    start: string | null;

    /** End. */
    end: string | null;
  };

  public constructor(data: InitArgsAnime) {
    super();
    this.image = data.image;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.type = data.type;
    this.status = data.status;
    this.aired = data.aired;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
