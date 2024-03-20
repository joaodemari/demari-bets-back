import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateBetRequestDTO } from '../../infra/dtos/createBetRequestDTO';
import { CreateBetUseCase } from '../../domain/use-cases/create-bet-use-case';
export declare class CreateBetController {
    private readonly createBetUseCase;
    constructor(createBetUseCase: CreateBetUseCase);
    handle(body: CreateBetRequestDTO): Promise<BadRequestException | InternalServerErrorException | {
        id: string;
    }>;
}
