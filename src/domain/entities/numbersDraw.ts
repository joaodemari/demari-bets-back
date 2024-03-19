import { Entity } from 'src/core/tools/Entity';
import { BetEntity } from './bet';

interface NumbersDrawEntityProps {
  betWinners: BetEntity[];
  numbers: number[];
  createdAt: Date;
}

export class NumbersDrawEntity extends Entity<NumbersDrawEntityProps> {
  static create(props: NumbersDrawEntityProps, id?: string) {
    return new NumbersDrawEntity(props, id);
  }

  get betWinners() {
    return this.props.betWinners;
  }

  get numbers() {
    return this.props.numbers;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
