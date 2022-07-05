import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Id. */
  public readonly id: number | undefined;

  /** Image. */
  readonly image: string;

  /** TitleEng. */
  readonly titleEng: string;

  /** TitleJpn. */
  readonly titleJpn: string;

  /** Type. */
  readonly type: string;

  /** Status. */
  readonly status: string;

  public readonly aired: {

    /** Start. */
    start: string | null;

    /** End. */
    end: string | null;
  };

  public constructor(data: PostInitArgsAnime) {
    super();
    this.image = data.image;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.type = data.type;
    this.status = data.status;
    this.aired = data.aired;
  }
}

type PostInitArgsAnime = OmitImmerable<Anime>;
