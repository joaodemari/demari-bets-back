import { Either } from 'src/core/tools/either';
import { betRepository } from '../repositories/betRepository';
import { BetEntity } from '../entities/bet';
import { NumbersDrawRepository } from '../repositories/numbersDrawRepository';
export type MakeNumbersDrawUseCaseResponse = Either<null, {
    winners: BetEntity[];
    sortedNumbers: number[];
}>;
export declare class MakeNumbersDrawUseCase {
    private readonly betRepository;
    private readonly numbersDrawRepository;
    constructor(betRepository: betRepository, numbersDrawRepository: NumbersDrawRepository);
    execute(): Promise<MakeNumbersDrawUseCaseResponse>;
}
