import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ListValidBetsUseCase } from 'src/domain/use-cases/list-valid-bets-use-case';
import { BetPresenter } from '../presenters/BetPresenter';

@Controller()
export class ListValidBetsController {
  constructor(private readonly usecase: ListValidBetsUseCase) {}

  @Get('bets')
  async getBets() {
    const response = await this.usecase.getValidBets();

    if (response.isLeft()) {
      return new BadRequestException(response.value.message);
    }

    return response.value.map((bet) => {
      return BetPresenter.toHttp(bet);
    });
  }
}
