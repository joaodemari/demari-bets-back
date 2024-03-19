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
} from 'src/infra/dtos/createBetRequestDTO';
import { CreateBetUseCase } from 'src/domain/use-cases/create-bet-use-case';
import { UseZodGuard } from 'nestjs-zod';

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

      return { id: response.value.id };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
