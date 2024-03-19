import { NumbersDrawRepository } from '../../src/domain/repositories/numbersDrawRepository';
import { NumbersDrawEntity } from '../../src/domain/entities/numbersDraw';

export class InMemoryNumbersDrawRepository implements NumbersDrawRepository {
  items: NumbersDrawEntity[] = [];

  async makeNumbersDraw(numbersDraw: NumbersDrawEntity) {
    this.items.push(numbersDraw);
  }
}
