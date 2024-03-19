"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeNumbersDrawPresenter = void 0;
class MakeNumbersDrawPresenter {
    static toHttp(response) {
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
        };
    }
}
exports.MakeNumbersDrawPresenter = MakeNumbersDrawPresenter;
//# sourceMappingURL=makeNumbersDrawPresenter.js.map