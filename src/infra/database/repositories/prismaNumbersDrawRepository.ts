import { NumbersDrawEntity } from 'src/domain/entities/numbersDraw';
import { NumbersDrawRepository } from 'src/domain/repositories/numbersDrawRepository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNumbersDrawRepository implements NumbersDrawRepository {
  constructor(private readonly prisma: PrismaService) {}
  async makeNumbersDraw(numbersDraw: NumbersDrawEntity): Promise<void> {
    await this.prisma.numbersDrawn.create({
      data: {
        id: numbersDraw.id,
        numbers: numbersDraw.numbers,
        created_at: numbersDraw.createdAt,
        bet_winner: {
          connect: numbersDraw.betWinners.map((bet) => {
            return { id: bet.id };
          }),
        },
      },
    });

    return;
  }
}
