"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetPresenter = void 0;
class BetPresenter {
    static toHttp(entity) {
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
exports.BetPresenter = BetPresenter;
//# sourceMappingURL=BetPresenter.js.map