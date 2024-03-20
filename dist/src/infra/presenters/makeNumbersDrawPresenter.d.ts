import { MakeNumbersDrawUseCaseResponse } from '../../domain/use-cases/make-numbers-draw-use-case';
export declare class MakeNumbersDrawPresenter {
    static toHttp(response: MakeNumbersDrawUseCaseResponse): {
        winners: {
            user_name: string;
            user_cpf: string;
            numbers: number[];
            surprise: boolean;
            idUnico: number;
        }[];
        sortedNumbers: number[];
    };
}
