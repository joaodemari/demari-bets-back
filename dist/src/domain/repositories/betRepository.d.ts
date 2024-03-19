import { BetEntity } from '../entities/bet';
export declare abstract class betRepository {
    save: (bet: BetEntity) => Promise<void>;
    getBets: () => Promise<BetEntity[]>;
    getValidBets: () => Promise<BetEntity[]>;
    getLastBet: () => Promise<BetEntity>;
    getBetsByCpfAndIdUnico: (props: {
        cpf: string;
        idUnico: number;
    }[]) => Promise<BetEntity[]>;
    invalidateBetsBeforeDate: (date: Date) => Promise<void>;
    setAsWon: (bets: BetEntity[]) => Promise<void>;
}
