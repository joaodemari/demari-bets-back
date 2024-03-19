import { Entity } from 'src/core/tools/Entity';
import { Optional } from 'src/core/tools/optional';
interface BetEntityProps {
    won: boolean;
    isValid: boolean;
    idUnico: number;
    user_name: string;
    user_cpf: string;
    numbers: number[];
    created_at: Date;
    surprise: boolean;
}
export declare class BetEntity extends Entity<BetEntityProps> {
    static create(props: Optional<BetEntityProps, 'isValid' | 'won'>, id?: string): BetEntity;
    get isValid(): boolean;
    get idUnico(): number;
    get user_name(): string;
    get user_cpf(): string;
    get numbers(): number[];
    get createdAt(): Date;
    get surprise(): boolean;
    get won(): boolean;
    set isValid(isValid: boolean);
    set won(won: boolean);
}
export {};
