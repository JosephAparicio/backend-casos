import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { EstadoCaso } from '@/casos/enums/estado-caso.enum';

export class CreateCasoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsEnum(EstadoCaso)
  @IsOptional()
  estado?: EstadoCaso;
}
