import { AnimeDto } from '../dtos/anime.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Anime } from '../models/anime';
import { Pagination } from '../models/pagination';

import { AnimeMapper } from './anime.mapper';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination dto.
   */
  export function fromDto(dto: PaginationDto<AnimeDto>): Pagination<Anime> {
    const results = dto.results.map(anime => AnimeMapper.fromDto(anime));
    return new Pagination<Anime>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results,
    });
  }
}
