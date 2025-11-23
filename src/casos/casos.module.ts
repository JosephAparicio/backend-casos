import { Module } from '@nestjs/common';
import { CasosService } from '@/casos/casos.service';
import { CasosController } from '@/casos/casos.controller';

@Module({
  controllers: [CasosController],
  providers: [CasosService],
})
export class CasosModule {}
