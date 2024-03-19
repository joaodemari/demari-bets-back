import { Module } from '@nestjs/common';
import { betRepository } from '../../domain/repositories/betRepository';
import { PrismaService } from './prisma.service';
import { PrismaBetsReopsitory } from './repositories/prismaBetsRepository';
import { PrismaNumbersDrawRepository } from './repositories/prismaNumbersDrawRepository';
import { NumbersDrawRepository } from '../../domain/repositories/numbersDrawRepository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: betRepository,
      useClass: PrismaBetsReopsitory,
    },
    {
      provide: NumbersDrawRepository,
      useClass: PrismaNumbersDrawRepository,
    },
  ],
  exports: [PrismaService, betRepository, NumbersDrawRepository],
})
export class DatabaseModule {}
