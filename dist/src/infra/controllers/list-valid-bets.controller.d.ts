import { BadRequestException } from '@nestjs/common';
import { ListValidBetsUseCase } from '../../domain/use-cases/list-valid-bets-use-case';
export declare class ListValidBetsController {
    private readonly usecase;
    constructor(usecase: ListValidBetsUseCase);
    getBets(): Promise<BadRequestException | {
        id: string;
        idUnico: number;
        user_name: string;
        user_cpf: string;
        numbers: number[];
        surprise: boolean;
        created_at: Date;
        won: boolean;
        isValid: boolean;
    }[]>;
}
