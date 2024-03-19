import { BetEntity } from 'src/domain/entities/bet';

export class BetPresenter {
  static toHttp(entity: BetEntity) {
    return {
      id: entity.id,
      idUnico: entity.idUnico,
      user_name: entity.user_name,
      user_cpf: entity.user_cpf,
      numbers: entity.numbers,
      surprise: entity.surprise,
      created_at: entity.createdAt,
      won: entity.won,
      isValid: entity.isValid,
    };
  }
}
