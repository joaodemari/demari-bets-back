import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { MakeNumbersDrawUseCase } from 'src/domain/use-cases/make-numbers-draw-use-case';
export declare class MakeNumbersDrawController {
    private readonly makeNumbersDrawn;
    constructor(makeNumbersDrawn: MakeNumbersDrawUseCase);
    handle(): Promise<BadRequestException | InternalServerErrorException | {
        winners: {
            user_name: string;
            user_cpf: string;
            numbers: number[];
            surprise: boolean;
            idUnico: number;
        }[];
        sortedNumbers: number[];
    }>;
}
