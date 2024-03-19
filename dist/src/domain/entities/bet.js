"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetEntity = void 0;
const Entity_1 = require("../../core/tools/Entity");
class BetEntity extends Entity_1.Entity {
    static create(props, id) {
        return new BetEntity({
            ...props,
            isValid: props.isValid ?? true,
            won: props.won ?? false,
        }, id);
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
    set isValid(isValid) {
        this.props.isValid = isValid;
    }
    set won(won) {
        this.props.won = won;
    }
}
exports.BetEntity = BetEntity;
//# sourceMappingURL=bet.js.map