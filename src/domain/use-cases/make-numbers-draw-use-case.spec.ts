// import { InMemoryBetsRepository } from 'test/repositories/in-memory-bets-repository';
import { CreateBetUseCase } from './create-bet-use-case';
import { MakeNumbersDrawUseCase } from './make-numbers-draw-use-case';
import { PrismaBetsReopsitory } from 'src/infra/database/repositories/prismaBetsRepository';
import { PrismaNumbersDrawRepository } from 'src/infra/database/repositories/prismaNumbersDrawRepository';
import { PrismaService } from 'src/infra/database/prisma.service';

let inMemoryBetsRepository: PrismaBetsReopsitory;
let prisma: PrismaService;
let inMemoryNumbersDrawRepository: PrismaNumbersDrawRepository;
let createBet: CreateBetUseCase;
let sut: MakeNumbersDrawUseCase;

describe('Create Member', () => {
  beforeEach(() => {
    prisma = new PrismaService();
    inMemoryBetsRepository = new PrismaBetsReopsitory(prisma);
    inMemoryNumbersDrawRepository = new PrismaNumbersDrawRepository(prisma);
    createBet = new CreateBetUseCase(inMemoryBetsRepository);
    sut = new MakeNumbersDrawUseCase(
      inMemoryBetsRepository,
      inMemoryNumbersDrawRepository,
    );
  });

  it('should make the numbers draw', async () => {
    const betsTests = {
      1000: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [1, 2, 3, 4, 5],
        surprise: false,
      },
      1001: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [6, 7, 8, 9, 10],
        surprise: false,
      },
      1002: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [11, 12, 13, 14, 15],
        surprise: false,
      },
      1003: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [16, 17, 18, 19, 20],
        surprise: false,
      },
      1004: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [21, 22, 23, 24, 25],
        surprise: false,
      },
      1005: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [26, 27, 28, 29, 30],
        surprise: false,
      },
      1006: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [31, 32, 33, 34, 35],
        surprise: false,
      },
      1007: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [36, 37, 38, 39, 40],
        surprise: false,
      },
      1008: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [41, 42, 43, 44, 45],
        surprise: false,
      },
      1009: {
        user_name: 'any_user_name',
        user_cpf: '123.456.789-10',
        numbers: [46, 47, 48, 49, 50],
        surprise: false,
      },
    };

    for (const key in betsTests) {
      const bet = betsTests[key];
      await createBet.execute({
        user_name: bet.user_name,
        user_cpf: bet.user_cpf,
        numbers: bet.numbers,
        surprise: bet.surprise,
      });
    }

    const result = await sut.execute();

    expect(result.isRight()).toBeTruthy();
    if (result.isLeft()) return;

    console.log(result.value);
    const sortedNumbers = result.value.sortedNumbers;
    if (result.value.winners.length == 0) {
      const winners = result.value.winners;

      for (const winner of winners) {
        winner.numbers.every((number) => {
          expect(sortedNumbers).toContain(number);
        });
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(betsTests).forEach(([_, bet]) => {
        const allNumbersSortedIncludeTheBets = bet.numbers.every((number) => {
          sortedNumbers.includes(number);
        });
        expect(!allNumbersSortedIncludeTheBets).toBeTruthy();
      });
    }
  });
});
