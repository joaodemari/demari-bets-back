import { Entity } from '../../core/tools/Entity';
import { Optional } from '../../core/tools/optional';

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

export class BetEntity extends Entity<BetEntityProps> {
  static create(
    props: Optional<BetEntityProps, 'isValid' | 'won'>,
    id?: string,
  ) {
    return new BetEntity(
      {
        ...props,
        isValid: props.isValid ?? true,
        won: props.won ?? false,
      },
      id,
    );
  }

  get isValid() {
    return this.props.isValid;
  }

  get idUnico() {
    return this.props.idUnico;
  }

  get user_name() {
    return this.props.user_name;
  }

  get user_cpf() {
    return this.props.user_cpf;
  }

  get numbers() {
    return this.props.numbers;
  }

  get createdAt() {
    return this.props.created_at;
  }

  get surprise() {
    return this.props.surprise;
  }

  get won() {
    return this.props.won;
  }

  set isValid(isValid: boolean) {
    this.props.isValid = isValid;
  }

  set won(won: boolean) {
    this.props.won = won;
  }
}
