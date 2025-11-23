import { PaginationMetaDto } from '@/common/dto/pagination-meta.dto';

export class PaginatedResponseDto<T> {
  items: T[];
  meta: PaginationMetaDto;

  constructor(items: T[], meta: PaginationMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
