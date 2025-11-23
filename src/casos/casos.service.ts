import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCasoDto } from '@/casos/dto/create-caso.dto';
import { UpdateCasoDto } from '@/casos/dto/update-caso.dto';
import { FilterCasosDto } from '@/casos/dto/filter-casos.dto';
import { PaginationMetaDto } from '@/common/dto/pagination-meta.dto';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';

@Injectable()
export class CasosService {
  constructor(private prisma: PrismaService) {}

  async create(createCasoDto: CreateCasoDto) {
    const caso = await this.prisma.caso.create({
      data: createCasoDto,
    });

    return {
      message: 'Caso creado exitosamente',
      data: caso,
    };
  }

  async findAll(filterDto: FilterCasosDto) {
    const page = filterDto.page || 1;
    const limit = filterDto.limit || 10;
    const {
      estado,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      month,
      year,
    } = filterDto;

    const skip = (page - 1) * limit;

    const where: Prisma.CasoWhereInput = {
      ...(estado && { estado }),
      ...(search && {
        OR: [
          { nombre: { contains: search } },
          { descripcion: { contains: search } },
        ],
      }),
    };

    if (year) {
      const startDate = new Date(year, (month || 1) - 1, 1);
      const endDate = month
        ? new Date(year, month, 0, 23, 59, 59, 999)
        : new Date(year, 11, 31, 23, 59, 59, 999);

      where.createdAt = {
        gte: startDate,
        lte: endDate,
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.caso.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.caso.count({ where }),
    ]);

    const meta = new PaginationMetaDto(total, page, limit);
    const paginatedResponse = new PaginatedResponseDto(items, meta);

    return {
      message: 'Casos obtenidos exitosamente',
      data: paginatedResponse,
    };
  }

  async findOne(id: string) {
    const caso = await this.prisma.caso.findUnique({
      where: { id },
    });

    if (!caso) {
      throw new NotFoundException(`Caso con ID ${id} no encontrado`);
    }

    return {
      message: 'Caso obtenido exitosamente',
      data: caso,
    };
  }

  async update(id: string, updateCasoDto: UpdateCasoDto) {
    await this.findOne(id);

    const caso = await this.prisma.caso.update({
      where: { id },
      data: updateCasoDto,
    });

    return {
      message: 'Caso actualizado exitosamente',
      data: caso,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.caso.delete({
      where: { id },
    });

    return {
      message: 'Caso eliminado exitosamente',
      data: null,
    };
  }
}
