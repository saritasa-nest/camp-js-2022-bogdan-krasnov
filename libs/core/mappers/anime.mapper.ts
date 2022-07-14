import { AnimeStatus, AnimeType } from '../utils/enums/table';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: Object.values(AnimeType).includes(dto.type as AnimeType) ? dto.type as AnimeType : AnimeType.None,
      status: Object.values(AnimeStatus).includes(dto.type as AnimeStatus) ? dto.type as AnimeStatus : AnimeStatus.NotYetAired,
      airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airedEnd: dto.aired.end === null ? null : new Date(dto.aired.end),
    });
  }
}
