import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  CreateBetRequestDTO,
  createBetRequestSchema,
} from '../../infra/dtos/createBetRequestDTO';
import { CreateBetUseCase } from '../../domain/use-cases/create-bet-use-case';
import { UseZodGuard } from 'nestjs-zod';
import { BetPresenter } from '../presenters/BetPresenter';

@Controller()
export class CreateBetController {
  constructor(private readonly createBetUseCase: CreateBetUseCase) {}

  @UseZodGuard('body', createBetRequestSchema)
  @Post('bets')
  async handle(@Body() body: CreateBetRequestDTO) {
    const { user_name, user_cpf, numbers, surprise } = body;

    try {
      const response = await this.createBetUseCase.execute({
        user_name,
        user_cpf,
        numbers,
        surprise,
      });

      if (response.isLeft()) {
        return new BadRequestException(response.value.message);
      }

      return BetPresenter.toHttp(response.value);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
