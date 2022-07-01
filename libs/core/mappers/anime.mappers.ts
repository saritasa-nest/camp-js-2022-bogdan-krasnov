import { AnimeDto } from '../dtos/genre.dto';
import { Anime } from '../models/genre';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      image: dto.image,
      titleEng: dto.title_eng,
      titleJpn: dto.title_jpn,
      type: dto.type,
      status: dto.status,
    });
  }
}
