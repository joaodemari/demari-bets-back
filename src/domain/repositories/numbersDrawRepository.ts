import { NumbersDrawEntity } from '../entities/numbersDraw';

export abstract class NumbersDrawRepository {
  makeNumbersDraw: (numbersDraw: NumbersDrawEntity) => Promise<void>;
}
