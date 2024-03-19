import { Entity } from 'src/core/tools/Entity';
import { BetEntity } from './bet';
interface NumbersDrawEntityProps {
    betWinners: BetEntity[];
    numbers: number[];
    createdAt: Date;
}
export declare class NumbersDrawEntity extends Entity<NumbersDrawEntityProps> {
    static create(props: NumbersDrawEntityProps, id?: string): NumbersDrawEntity;
    get betWinners(): BetEntity[];
    get numbers(): number[];
    get createdAt(): Date;
}
export {};
