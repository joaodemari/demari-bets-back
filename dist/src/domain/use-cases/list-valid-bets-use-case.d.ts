import { betRepository } from '../repositories/betRepository';
import { Either } from '../../core/tools/either';
import { BetEntity } from '../entities/bet';
type ListValidBetsResponse = Either<Error, BetEntity[]>;
export declare class ListValidBetsUseCase {
    private readonly repository;
    constructor(repository: betRepository);
    getValidBets(): Promise<ListValidBetsResponse>;
}
export {};
