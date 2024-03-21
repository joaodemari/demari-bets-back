import { Injectable } from '@nestjs/common';
import { Either, right } from '../../core/tools/either';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { betRepository } from '../repositories/betRepository';
import { BetEntity } from '../entities/bet';
import { NumbersDrawRepository } from '../repositories/numbersDrawRepository';
import { NumbersDrawEntity } from '../entities/numbersDraw';

export type MakeNumbersDrawUseCaseResponse = Either<
  null,
  {
    winners: BetEntity[];
    sortedNumbers: number[];
    numbersAndCount: {
      number:number;
      count:number;
    }[]
  }
>;

@Injectable()
export class MakeNumbersDrawUseCase {
  constructor(
    private readonly betRepository: betRepository,
    private readonly numbersDrawRepository: NumbersDrawRepository,
  ) {}

  async execute(): Promise<MakeNumbersDrawUseCaseResponse> {
    const allValidBets = await this.betRepository.getValidBets();

    console.log(allValidBets);

    const winnersIds: string[] = [];

    const hashMapNumbersAndCpfs = allValidBets.reduce<{
      [key: number]: string[];
    }>((acc, bet) => {
      bet.numbers.map((number) => {
        if (!acc[number]) {
          acc[number] = [];
        }

        acc[number].push(bet.user_cpf + '|' + bet.idUnico);
      });
      return acc;
    }, {});

    const sortedNumbers = [];

    const cpfsNumbersCount = {};

    for (let i = 0; i < 5; i++) {
      let sortedNumber: number;
      do {
        sortedNumber = Math.floor(Math.random() * 50) + 1;
      } while (sortedNumbers.includes(sortedNumber));
      sortedNumbers.push(sortedNumber);

      if (!hashMapNumbersAndCpfs[sortedNumber]) {
        continue;
      }
      const cpfsWithTheNumber = hashMapNumbersAndCpfs[sortedNumber];
      console.log(cpfsWithTheNumber);
      cpfsWithTheNumber.forEach((cpfAndIdUnico) => {
        if (!cpfsNumbersCount[cpfAndIdUnico]) {
          cpfsNumbersCount[cpfAndIdUnico] = 0;
        }

        cpfsNumbersCount[cpfAndIdUnico] += 1;

        if (cpfsNumbersCount[cpfAndIdUnico] === 5) {
          winnersIds.push(cpfAndIdUnico);
        }
      });
    }

    if (winnersIds.length > 0) {
      const winnersCpfsAndIdUnico: { cpf: string; idUnico: number }[] =
        winnersIds.map((winner) => {
          const [cpf, idUnicoString] = winner.split('|');
          const idUnico = parseInt(idUnicoString, 10);
          return { cpf, idUnico };
        });

      const winners: BetEntity[] =
        await this.betRepository.getBetsByCpfAndIdUnico(winnersCpfsAndIdUnico);
      return right({ winners, sortedNumbers, numbersAndCount : Object.entries(hashMapNumbersAndCpfs).map(([key, value]) => {
        return {
          number: +key,
          count: value.length
        }
      }) });
    }

    let sortedNumber: number;

    while (winnersIds.length === 0 && sortedNumbers.length < 30) {
      do {
        sortedNumber = Math.floor(Math.random() * 50) + 1;
      } while (sortedNumbers.includes(sortedNumber));
      sortedNumbers.push(sortedNumber);
      if (!hashMapNumbersAndCpfs[sortedNumber]) {
        continue;
      }
      const cpfsWithTheNumber = hashMapNumbersAndCpfs[sortedNumber];

      cpfsWithTheNumber.forEach((cpfAndIdUnico) => {
        if (!cpfsNumbersCount[cpfAndIdUnico]) {
          cpfsNumbersCount[cpfAndIdUnico] = 0;
        }

        cpfsNumbersCount[cpfAndIdUnico] += 1;

        if (cpfsNumbersCount[cpfAndIdUnico] === 5) {
          winnersIds.push(cpfAndIdUnico);
          console.log(cpfsNumbersCount);
          console.log(cpfsNumbersCount[cpfAndIdUnico] === 5);
          console.log(winnersIds);
        }

        return cpfsNumbersCount;
      });
    }
    const winnersCpfsAndIdUnico: { cpf: string; idUnico: number }[] =
      winnersIds.map((winner) => {
        const [cpf, idUnicoString] = winner.split('|');
        const idUnico = parseInt(idUnicoString, 10);
        return { cpf, idUnico };
      });

    const winners: BetEntity[] =
      await this.betRepository.getBetsByCpfAndIdUnico(winnersCpfsAndIdUnico);

    const numbersDraw = NumbersDrawEntity.create({
      createdAt: new Date(),
      numbers: sortedNumbers,
      betWinners: winners,
    });

    await this.numbersDrawRepository.makeNumbersDraw(numbersDraw);
    await this.betRepository.invalidateBetsBeforeDate(numbersDraw.createdAt);
    await this.betRepository.setAsWon(winners);
    return right({ winners,
      sortedNumbers,
      numbersAndCount : Object.entries(hashMapNumbersAndCpfs).map(([key, value]) => {
      return {
        number: +key,
        count: value.length
      }
    })});
  }
}
