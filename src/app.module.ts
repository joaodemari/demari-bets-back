import { Module } from '@nestjs/common';
import { CreateBetController } from './infra/controllers/create-bet.controller';
import { CreateBetUseCase } from './domain/use-cases/create-bet-use-case';
import { DatabaseModule } from './infra/database/database.module';
import { MakeNumbersDrawUseCase } from './domain/use-cases/make-numbers-draw-use-case';
import { MakeNumbersDrawController } from './infra/controllers/make-numbers-draw.controller';
import { ListValidBetsController } from './infra/controllers/list-valid-bets.controller';
import { ListValidBetsUseCase } from './domain/use-cases/list-valid-bets-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateBetController,
    MakeNumbersDrawController,
    ListValidBetsController,
  ],
  providers: [CreateBetUseCase, MakeNumbersDrawUseCase, ListValidBetsUseCase],
})
export class AppModule {}
