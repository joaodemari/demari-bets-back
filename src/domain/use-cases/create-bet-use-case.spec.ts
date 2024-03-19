import { InMemoryBetsRepository } from '../../../test/repositories/in-memory-bets-repository';
import { CreateBetUseCase } from './create-bet-use-case';

let inMemoryBetsRepository: InMemoryBetsRepository;
let sut: CreateBetUseCase;

describe('Create Member', () => {
  beforeEach(() => {
    inMemoryBetsRepository = new InMemoryBetsRepository();
    sut = new CreateBetUseCase(inMemoryBetsRepository);
  });

  it('should be able create a bet', async () => {
    const result = await sut.execute({
      user_name: 'any_user_name',
      user_cpf: 'any_user_cpf',
      numbers: [1, 2, 3, 4, 5],
      surprise: false,
    });

    const bets = await inMemoryBetsRepository.getBets();

    expect(bets).toHaveLength(1);
    if (result.isLeft()) return;
    expect(result.value.idUnico).toBe(1000);
  });

  it('should not be able to create a 4 number bet', async () => {
    const result = await sut.execute({
      user_name: 'any_user_name',
      user_cpf: 'any_user_cpf',
      numbers: [1, 2, 3, 4],
      surprise: false,
    });

    expect(result.value).toBeInstanceOf(Error);
  });
});
