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
exports.MakeNumbersDrawController = void 0;
const common_1 = require("@nestjs/common");
const make_numbers_draw_use_case_1 = require("../../domain/use-cases/make-numbers-draw-use-case");
const makeNumbersDrawPresenter_1 = require("../presenters/makeNumbersDrawPresenter");
let MakeNumbersDrawController = class MakeNumbersDrawController {
    constructor(makeNumbersDrawn) {
        this.makeNumbersDrawn = makeNumbersDrawn;
    }
    async handle() {
        try {
            const response = await this.makeNumbersDrawn.execute();
            if (response.isLeft()) {
                return new common_1.BadRequestException();
            }
            return makeNumbersDrawPresenter_1.MakeNumbersDrawPresenter.toHttp(response);
        }
        catch (error) {
            return new common_1.InternalServerErrorException(error);
        }
    }
};
exports.MakeNumbersDrawController = MakeNumbersDrawController;
__decorate([
    (0, common_1.Post)('numbers-draw'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MakeNumbersDrawController.prototype, "handle", null);
exports.MakeNumbersDrawController = MakeNumbersDrawController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [make_numbers_draw_use_case_1.MakeNumbersDrawUseCase])
], MakeNumbersDrawController);
//# sourceMappingURL=make-numbers-draw.controller.js.map