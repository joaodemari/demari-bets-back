import { NumbersDrawEntity } from '../entities/numbersDraw';
export declare abstract class NumbersDrawRepository {
    makeNumbersDraw: (numbersDraw: NumbersDrawEntity) => Promise<void>;
}
