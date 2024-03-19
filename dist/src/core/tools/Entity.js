"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const mongodb_1 = require("mongodb");
class Entity {
    get id() {
        return this._id;
    }
    constructor(props, id) {
        this.props = props;
        this._id = id ?? new mongodb_1.ObjectId().toString();
    }
    equals(entity) {
        if (entity === this) {
            return true;
        }
        if (entity.id === this._id) {
            return true;
        }
        return false;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map