import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { MakeNumbersDrawUseCase } from 'src/domain/use-cases/make-numbers-draw-use-case';
import { MakeNumbersDrawPresenter } from '../presenters/makeNumbersDrawPresenter';

@Controller()
export class MakeNumbersDrawController {
  constructor(private readonly makeNumbersDrawn: MakeNumbersDrawUseCase) {}

  @Post('numbers-draw')
  async handle() {
    try {
      const response = await this.makeNumbersDrawn.execute();

      if (response.isLeft()) {
        return new BadRequestException();
      }

      return MakeNumbersDrawPresenter.toHttp(response);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
