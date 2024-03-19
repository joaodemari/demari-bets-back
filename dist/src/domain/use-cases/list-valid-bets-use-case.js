"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListValidBetsUseCase = void 0;
const common_1 = require("@nestjs/common");
const betRepository_1 = require("../repositories/betRepository");
const either_1 = require("../../core/tools/either");
let ListValidBetsUseCase = class ListValidBetsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async getValidBets() {
        try {
            const bets = await this.repository.getValidBets();
            return (0, either_1.right)(bets);
        }
        catch (e) {
            return (0, either_1.left)(new Error('Error getting valid bets'));
        }
    }
};
exports.ListValidBetsUseCase = ListValidBetsUseCase;
exports.ListValidBetsUseCase = ListValidBetsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [betRepository_1.betRepository])
], ListValidBetsUseCase);
//# sourceMappingURL=list-valid-bets-use-case.js.map