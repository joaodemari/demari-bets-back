import { BetEntity } from 'src/domain/entities/bet';
export declare class BetPresenter {
    static toHttp(entity: BetEntity): {
        id: string;
        idUnico: number;
        user_name: string;
        user_cpf: string;
        numbers: number[];
        surprise: boolean;
        created_at: Date;
        won: boolean;
        isValid: boolean;
    };
}
