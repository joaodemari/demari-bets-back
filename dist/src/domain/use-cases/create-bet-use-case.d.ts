import { betRepository } from '../repositories/betRepository';
import { BetEntity } from '../entities/bet';
import { Either } from 'src/core/tools/either';
interface CreateBetUseCaseProps {
    user_name: string;
    user_cpf: string;
    numbers: number[];
    surprise: boolean;
}
type CreateBetUseCaseResponse = Either<Error, BetEntity>;
export declare class CreateBetUseCase {
    private readonly repository;
    constructor(repository: betRepository);
    execute({ user_name, user_cpf, numbers, surprise, }: CreateBetUseCaseProps): Promise<CreateBetUseCaseResponse>;
    getBets(): Promise<BetEntity[]>;
}
export {};
