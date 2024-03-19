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
exports.PrismaBetsReopsitory = void 0;
const common_1 = require("@nestjs/common");
const bet_1 = require("../../../domain/entities/bet");
const prisma_service_1 = require("../prisma.service");
let PrismaBetsReopsitory = class PrismaBetsReopsitory {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async setAsWon(bet) {
        await this.prisma.bet.updateMany({
            where: {
                id: {
                    in: bet.map((bet) => bet.id),
                },
            },
            data: {
                won: true,
            },
        });
        return;
    }
    async save(bet) {
        await this.prisma.bet.create({
            data: {
                id: bet.id,
                id_unico: bet.idUnico,
                user_name: bet.user_name,
                user_cpf: bet.user_cpf,
                numbers: bet.numbers,
                created_at: bet.createdAt,
                surprise: bet.surprise,
                won: bet.won,
                isValid: bet.isValid,
            },
        });
        return;
    }
    async getBets() {
        const bets = await this.prisma.bet.findMany();
        return bets.map((bet) => bet_1.BetEntity.create({
            created_at: bet.created_at,
            idUnico: bet.id_unico,
            user_cpf: bet.user_cpf,
            user_name: bet.user_name,
            numbers: bet.numbers,
            surprise: bet.surprise,
            isValid: bet.isValid,
            won: bet.won,
        }, bet.id));
    }
    async getValidBets() {
        const bets = await this.prisma.bet.findMany({
            where: {
                isValid: true,
            },
        });
        if (!bets)
            return [];
        return bets.map((bet) => bet_1.BetEntity.create({
            created_at: bet.created_at,
            idUnico: bet.id_unico,
            user_cpf: bet.user_cpf,
            user_name: bet.user_name,
            numbers: bet.numbers,
            surprise: bet.surprise,
            isValid: bet.isValid,
            won: bet.won,
        }, bet.id));
    }
    async getLastBet() {
        const bet = await this.prisma.bet.findFirst({
            orderBy: {
                created_at: 'desc',
            },
        });
        if (!bet)
            return null;
        return bet_1.BetEntity.create({
            created_at: bet.created_at,
            idUnico: bet.id_unico,
            user_cpf: bet.user_cpf,
            user_name: bet.user_name,
            numbers: bet.numbers,
            surprise: bet.surprise,
            isValid: bet.isValid,
            won: bet.won,
        }, bet.id);
    }
    async getBetsByCpfAndIdUnico(props) {
        const bets = await this.prisma.bet.findMany({
            where: {
                user_cpf: { in: props.map((prop) => prop.cpf) },
                id_unico: { in: props.map((prop) => prop.idUnico) },
            },
        });
        return bets.map((bet) => bet_1.BetEntity.create({
            created_at: bet.created_at,
            idUnico: bet.id_unico,
            user_cpf: bet.user_cpf,
            user_name: bet.user_name,
            numbers: bet.numbers,
            surprise: bet.surprise,
            isValid: bet.isValid,
            won: bet.won,
        }, bet.id));
    }
    async invalidateBetsBeforeDate(date) {
        await this.prisma.bet.updateMany({
            where: {
                created_at: {
                    lt: date,
                },
            },
            data: {
                isValid: false,
            },
        });
        return;
    }
};
exports.PrismaBetsReopsitory = PrismaBetsReopsitory;
exports.PrismaBetsReopsitory = PrismaBetsReopsitory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaBetsReopsitory);
//# sourceMappingURL=prismaBetsRepository.js.map