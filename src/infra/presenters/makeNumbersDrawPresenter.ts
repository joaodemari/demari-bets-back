import { MakeNumbersDrawUseCaseResponse } from '../../domain/use-cases/make-numbers-draw-use-case';

export class MakeNumbersDrawPresenter {
  static toHttp(response: MakeNumbersDrawUseCaseResponse) {
    return {
      winners: response.value.winners.map((winner) => {
        return {
          user_name: winner.user_name,
          user_cpf: winner.user_cpf,
          numbers: winner.numbers,
          surprise: winner.surprise,
          idUnico: winner.idUnico,
        };
      }),
      sortedNumbers: response.value.sortedNumbers,
      numbersAndCount : response.value.numbersAndCount
    };
  }
}
