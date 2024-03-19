import { Injectable } from '@nestjs/common';
import { betRepository } from '../repositories/betRepository';
import { Either, left, right } from 'src/core/tools/either';
import { BetEntity } from '../entities/bet';

type ListValidBetsResponse = Either<Error, BetEntity[]>;

@Injectable()
export class ListValidBetsUseCase {
  constructor(private readonly repository: betRepository) {}

  async getValidBets(): Promise<ListValidBetsResponse> {
    try {
      const bets = await this.repository.getValidBets();
      return right(bets);
    } catch (e) {
      return left(new Error('Error getting valid bets'));
    }
  }
}
