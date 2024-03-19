"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumbersDrawEntity = void 0;
const Entity_1 = require("../../core/tools/Entity");
class NumbersDrawEntity extends Entity_1.Entity {
    static create(props, id) {
        return new NumbersDrawEntity(props, id);
    }
    get betWinners() {
        return this.props.betWinners;
    }
    get numbers() {
        return this.props.numbers;
    }
    get createdAt() {
        return this.props.createdAt;
    }
}
exports.NumbersDrawEntity = NumbersDrawEntity;
//# sourceMappingURL=numbersDraw.js.map