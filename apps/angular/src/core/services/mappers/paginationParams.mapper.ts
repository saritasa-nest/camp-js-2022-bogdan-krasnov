import { PaginationParamsDto } from './dto/paginationParams.dto';

import { PaginationParams } from '../../models/pagination-params';


export namespace PaginationParamsMapper {

  /**
   * Maps model to dto.
   * @param model Search params model.
   */
  export function toDto(model: PaginationParams): PaginationParamsDto {
    return {
      limit: model.size,
      offset: model.page * model.size,
      ordering: String(model.sort),
      search: String(model.search),
      type__in: String(model.type),
    };
  }
}
