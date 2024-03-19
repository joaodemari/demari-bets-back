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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBetController = void 0;
const common_1 = require("@nestjs/common");
const createBetRequestDTO_1 = require("../dtos/createBetRequestDTO");
const create_bet_use_case_1 = require("../../domain/use-cases/create-bet-use-case");
const nestjs_zod_1 = require("nestjs-zod");
let CreateBetController = class CreateBetController {
    constructor(createBetUseCase) {
        this.createBetUseCase = createBetUseCase;
    }
    async handle(body) {
        const { user_name, user_cpf, numbers, surprise } = body;
        try {
            const response = await this.createBetUseCase.execute({
                user_name,
                user_cpf,
                numbers,
                surprise,
            });
            if (response.isLeft()) {
                return new common_1.BadRequestException(response.value.message);
            }
            return { id: response.value.id };
        }
        catch (error) {
            return new common_1.InternalServerErrorException(error);
        }
    }
};
exports.CreateBetController = CreateBetController;
__decorate([
    (0, nestjs_zod_1.UseZodGuard)('body', createBetRequestDTO_1.createBetRequestSchema),
    (0, common_1.Post)('bets'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBetRequestDTO_1.CreateBetRequestDTO]),
    __metadata("design:returntype", Promise)
], CreateBetController.prototype, "handle", null);
exports.CreateBetController = CreateBetController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [create_bet_use_case_1.CreateBetUseCase])
], CreateBetController);
//# sourceMappingURL=create-bet.controller.js.map