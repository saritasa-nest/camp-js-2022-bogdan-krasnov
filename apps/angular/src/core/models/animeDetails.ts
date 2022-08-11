import { Anime } from '@js-camp/core/models/anime';
import { Genre } from '@js-camp/core/models/genre';
import { OmitImmerable } from '@js-camp/core/models/immerable';

/** Anime details. */
export class AnimeDetails extends Anime {

  /** List of anime genres. */
  public readonly genresData: readonly Genre[];

  /** List of anime producing studios. */
  public readonly studiosData: string;

  /** Whether it is airing. */
  public readonly isAiring: boolean;

  /** Anime trailer ID. */
  public readonly trailerYoutubeId: string | null;

  /** Short review about anime. */
  public readonly synopsis: string;

  public constructor(data: InitArgsAnimeDetails) {
    super(data);
    this.genresData = data.genresData;
    this.studiosData = data.studiosData;
    this.isAiring = data.isAiring;
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
  }
}

type InitArgsAnimeDetails = OmitImmerable<AnimeDetails>;
