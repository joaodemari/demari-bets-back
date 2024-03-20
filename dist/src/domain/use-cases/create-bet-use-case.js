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
exports.CreateBetUseCase = void 0;
const common_1 = require("@nestjs/common");
const betRepository_1 = require("../repositories/betRepository");
const bet_1 = require("../entities/bet");
const either_1 = require("../../core/tools/either");
let CreateBetUseCase = class CreateBetUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute({ user_name, user_cpf, numbers, surprise, }) {
        const WrongProps = () => {
            if (!(numbers.length === 5))
                return { message: 'Bet must have 5 numbers', isWrong: true };
            if (!user_cpf || !user_name)
                return { message: 'A bet must have a name or a cpf', isWrong: true };
            return { message: 'Everything OK', isWrong: false };
        };
        const props = WrongProps();
        if (props.isWrong) {
            return (0, either_1.left)(new Error(props.message));
        }
        const lastBet = await this.repository.getLastBet();
        const bet = bet_1.BetEntity.create({
            created_at: new Date(),
            idUnico: lastBet ? lastBet.idUnico + 1 : 1000,
            isValid: true,
            numbers,
            user_cpf,
            user_name,
            surprise,
        });
        await this.repository.save(bet);
        return (0, either_1.right)(bet);
    }
    async getBets() {
        const bets = await this.repository.getBets();
        return bets;
    }
};
exports.CreateBetUseCase = CreateBetUseCase;
exports.CreateBetUseCase = CreateBetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [betRepository_1.betRepository])
], CreateBetUseCase);
//# sourceMappingURL=create-bet-use-case.js.map