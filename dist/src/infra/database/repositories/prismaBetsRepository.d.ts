import { BetEntity } from 'src/domain/entities/bet';
import { betRepository } from 'src/domain/repositories/betRepository';
import { PrismaService } from '../prisma.service';
export declare class PrismaBetsReopsitory implements betRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    setAsWon(bet: BetEntity[]): Promise<void>;
    save(bet: BetEntity): Promise<void>;
    getBets(): Promise<BetEntity[]>;
    getValidBets(): Promise<BetEntity[]>;
    getLastBet(): Promise<BetEntity>;
    getBetsByCpfAndIdUnico(props: {
        cpf: string;
        idUnico: number;
    }[]): Promise<BetEntity[]>;
    invalidateBetsBeforeDate(date: Date): Promise<void>;
}
