import { Injectable } from '@nestjs/common';
import { betRepository } from '../repositories/betRepository';
import { BetEntity } from '../entities/bet';
import { Either, left, right } from '../../core/tools/either';

interface CreateBetUseCaseProps {
  user_name: string;
  user_cpf: string;
  numbers: number[];
  surprise: boolean;
}

type CreateBetUseCaseResponse = Either<Error, BetEntity>;

@Injectable()
export class CreateBetUseCase {
  constructor(private readonly repository: betRepository) {}

  async execute({
    user_name,
    user_cpf,
    numbers,
    surprise,
  }: CreateBetUseCaseProps): Promise<CreateBetUseCaseResponse> {
    const WrongProps = (): { message: string; isWrong: boolean } => {
      if (!(numbers.length === 5))
        return { message: 'Bet must have 5 numbers', isWrong: true };
      if (!user_cpf || !user_name)
        return { message: 'A bet must have a name or a cpf', isWrong: true };
      return { message: 'Everything OK', isWrong: false };
    };

    const props = WrongProps();

    if (props.isWrong) {
      return left(new Error(props.message));
    }

    const lastBet = await this.repository.getLastBet();

    const bet: BetEntity = BetEntity.create({
      created_at: new Date(),
      idUnico: lastBet ? lastBet.idUnico + 1 : 1000,
      isValid: true,
      numbers,
      user_cpf,
      user_name,
      surprise,
    });

    await this.repository.save(bet);

    return right(bet);
  }

  async getBets(): Promise<BetEntity[]> {
    const bets = await this.repository.getBets();
    return bets;
  }
}
