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
exports.MakeNumbersDrawUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../core/tools/either");
const betRepository_1 = require("../repositories/betRepository");
const numbersDrawRepository_1 = require("../repositories/numbersDrawRepository");
const numbersDraw_1 = require("../entities/numbersDraw");
let MakeNumbersDrawUseCase = class MakeNumbersDrawUseCase {
    constructor(betRepository, numbersDrawRepository) {
        this.betRepository = betRepository;
        this.numbersDrawRepository = numbersDrawRepository;
    }
    async execute() {
        const allValidBets = await this.betRepository.getValidBets();
        console.log(allValidBets);
        const winnersIds = [];
        const hashMapNumbersAndCpfs = allValidBets.reduce((acc, bet) => {
            bet.numbers.map((number) => {
                if (!acc[number]) {
                    acc[number] = [];
                }
                acc[number].push(bet.user_cpf + '|' + bet.idUnico);
            });
            return acc;
        }, {});
        const sortedNumbers = [];
        const cpfsNumbersCount = {};
        for (let i = 0; i < 5; i++) {
            let sortedNumber;
            do {
                sortedNumber = Math.floor(Math.random() * 50) + 1;
            } while (sortedNumbers.includes(sortedNumber));
            sortedNumbers.push(sortedNumber);
            if (!hashMapNumbersAndCpfs[sortedNumber]) {
                continue;
            }
            const cpfsWithTheNumber = hashMapNumbersAndCpfs[sortedNumber];
            console.log(cpfsWithTheNumber);
            cpfsWithTheNumber.forEach((cpfAndIdUnico) => {
                if (!cpfsNumbersCount[cpfAndIdUnico]) {
                    cpfsNumbersCount[cpfAndIdUnico] = 0;
                }
                cpfsNumbersCount[cpfAndIdUnico] += 1;
                if (cpfsNumbersCount[cpfAndIdUnico] === 5) {
                    winnersIds.push(cpfAndIdUnico);
                }
            });
        }
        if (winnersIds.length > 0) {
            const winnersCpfsAndIdUnico = winnersIds.map((winner) => {
                const [cpf, idUnicoString] = winner.split('|');
                const idUnico = parseInt(idUnicoString, 10);
                return { cpf, idUnico };
            });
            const winners = await this.betRepository.getBetsByCpfAndIdUnico(winnersCpfsAndIdUnico);
            return (0, either_1.right)({ winners, sortedNumbers });
        }
        let sortedNumber;
        while (winnersIds.length === 0 && sortedNumbers.length < 30) {
            do {
                sortedNumber = Math.floor(Math.random() * 50) + 1;
            } while (sortedNumbers.includes(sortedNumber));
            sortedNumbers.push(sortedNumber);
            if (!hashMapNumbersAndCpfs[sortedNumber]) {
                continue;
            }
            const cpfsWithTheNumber = hashMapNumbersAndCpfs[sortedNumber];
            cpfsWithTheNumber.forEach((cpfAndIdUnico) => {
                if (!cpfsNumbersCount[cpfAndIdUnico]) {
                    cpfsNumbersCount[cpfAndIdUnico] = 0;
                }
                cpfsNumbersCount[cpfAndIdUnico] += 1;
                if (cpfsNumbersCount[cpfAndIdUnico] === 5) {
                    winnersIds.push(cpfAndIdUnico);
                    console.log(cpfsNumbersCount);
                    console.log(cpfsNumbersCount[cpfAndIdUnico] === 5);
                    console.log(winnersIds);
                }
                return cpfsNumbersCount;
            });
        }
        const winnersCpfsAndIdUnico = winnersIds.map((winner) => {
            const [cpf, idUnicoString] = winner.split('|');
            const idUnico = parseInt(idUnicoString, 10);
            return { cpf, idUnico };
        });
        const winners = await this.betRepository.getBetsByCpfAndIdUnico(winnersCpfsAndIdUnico);
        const numbersDraw = numbersDraw_1.NumbersDrawEntity.create({
            createdAt: new Date(),
            numbers: sortedNumbers,
            betWinners: winners,
        });
        await this.numbersDrawRepository.makeNumbersDraw(numbersDraw);
        await this.betRepository.invalidateBetsBeforeDate(numbersDraw.createdAt);
        await this.betRepository.setAsWon(winners);
        return (0, either_1.right)({ winners, sortedNumbers });
    }
};
exports.MakeNumbersDrawUseCase = MakeNumbersDrawUseCase;
exports.MakeNumbersDrawUseCase = MakeNumbersDrawUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [betRepository_1.betRepository,
        numbersDrawRepository_1.NumbersDrawRepository])
], MakeNumbersDrawUseCase);
//# sourceMappingURL=make-numbers-draw-use-case.js.map