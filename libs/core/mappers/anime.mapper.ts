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

      // I don't know yet how to solve it so that there is an assignment between different types.
      type: dto.type,
      status: dto.status,
      airedStart: new Date(dto.aired.start),
      airedEnd: new Date(dto.aired.end),
    });
  }
}
