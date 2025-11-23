import { PartialType } from '@nestjs/mapped-types';
import { CreateCasoDto } from '@/casos/dto/create-caso.dto';

export class UpdateCasoDto extends PartialType(CreateCasoDto) {}
