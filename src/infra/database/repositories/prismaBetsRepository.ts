import { Injectable } from '@nestjs/common';
import { BetEntity } from '../../../domain/entities/bet';
import { betRepository } from '../../../domain/repositories/betRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBetsReopsitory implements betRepository {
  constructor(private readonly prisma: PrismaService) {}

  async setAsWon(bet: BetEntity[]): Promise<void> {
    await this.prisma.bet.updateMany({
      where: {
        id: {
          in: bet.map((bet) => bet.id),
        },
      },
      data: {
        won: true,
      },
    });

    return;
  }

  async save(bet: BetEntity): Promise<void> {
    await this.prisma.bet.create({
      data: {
        id: bet.id,
        id_unico: bet.idUnico,
        user_name: bet.user_name,
        user_cpf: bet.user_cpf,
        numbers: bet.numbers,
        created_at: bet.createdAt,
        surprise: bet.surprise,
        won: bet.won,
        isValid: bet.isValid,
      },
    });

    return;
  }

  async getBets(): Promise<BetEntity[]> {
    const bets = await this.prisma.bet.findMany();

    return bets.map((bet) =>
      BetEntity.create(
        {
          created_at: bet.created_at,
          idUnico: bet.id_unico,
          user_cpf: bet.user_cpf,
          user_name: bet.user_name,
          numbers: bet.numbers,
          surprise: bet.surprise,
          isValid: bet.isValid,
          won: bet.won,
        },
        bet.id,
      ),
    );
  }

  async getValidBets(): Promise<BetEntity[]> {
    const bets = await this.prisma.bet.findMany({
      where: {
        isValid: true,
      },
    });

    if (!bets) return [];

    return bets.map((bet) =>
      BetEntity.create(
        {
          created_at: bet.created_at,
          idUnico: bet.id_unico,
          user_cpf: bet.user_cpf,
          user_name: bet.user_name,
          numbers: bet.numbers,
          surprise: bet.surprise,
          isValid: bet.isValid,
          won: bet.won,
        },
        bet.id,
      ),
    );
  }

  async getLastBet(): Promise<BetEntity> {
    const bet = await this.prisma.bet.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!bet) return null;

    return BetEntity.create(
      {
        created_at: bet.created_at,
        idUnico: bet.id_unico,
        user_cpf: bet.user_cpf,
        user_name: bet.user_name,
        numbers: bet.numbers,
        surprise: bet.surprise,
        isValid: bet.isValid,
        won: bet.won,
      },
      bet.id,
    );
  }

  async getBetsByCpfAndIdUnico(
    props: {
      cpf: string;
      idUnico: number;
    }[],
  ): Promise<BetEntity[]> {
    const bets = await this.prisma.bet.findMany({
      where: {
        user_cpf: { in: props.map((prop) => prop.cpf) },
        id_unico: { in: props.map((prop) => prop.idUnico) },
      },
    });

    return bets.map((bet) =>
      BetEntity.create(
        {
          created_at: bet.created_at,
          idUnico: bet.id_unico,
          user_cpf: bet.user_cpf,
          user_name: bet.user_name,
          numbers: bet.numbers,
          surprise: bet.surprise,
          isValid: bet.isValid,
          won: bet.won,
        },
        bet.id,
      ),
    );
  }

  async invalidateBetsBeforeDate(date: Date): Promise<void> {
    await this.prisma.bet.updateMany({
      where: {
        created_at: {
          lt: date,
        },
      },
      data: {
        isValid: false,
      },
    });

    return;
  }
}
