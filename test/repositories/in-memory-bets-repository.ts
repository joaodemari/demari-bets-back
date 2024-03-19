import { BetEntity } from 'src/domain/entities/bet';
import { betRepository } from 'src/domain/repositories/betRepository';

export class InMemoryBetsRepository implements betRepository {
  items: BetEntity[] = [];

  async save(bet: BetEntity): Promise<void> {
    this.items.push(bet);
  }

  async getBets(): Promise<BetEntity[]> {
    return this.items;
  }

  async getBetByPeriod(start: Date, end: Date): Promise<BetEntity> {
    return this.items.find((item) => {
      return item.createdAt >= start && item.createdAt <= end;
    });
  }

  async getValidBets(): Promise<BetEntity[]> {
    return this.items.filter((item) => item.isValid === true);
  }

  async getLastBet(): Promise<BetEntity> {
    return this.items[this.items.length - 1];
  }

  async getBetsByCpfAndIdUnico(
    props: { cpf: string; idUnico: number }[],
  ): Promise<BetEntity[]> {
    return this.items.filter((item) => {
      return props.some((prop) => {
        return item.user_cpf === prop.cpf && item.idUnico === prop.idUnico;
      });
    });
  }

  async invalidateBetsBeforeDate(date: Date): Promise<void> {
    this.items = this.items.map((item) => {
      if (item.createdAt < date) {
        item.isValid = false;
      }
      return item;
    });
  }

  async setAsWon(bets: BetEntity[]): Promise<void> {
    this.items = this.items.map((item) => {
      if (bets.some((bet) => bet.idUnico === item.idUnico)) {
        item.won = true;
      }
      return item;
    });
  }
}
