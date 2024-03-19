"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const create_bet_controller_1 = require("./infra/controllers/create-bet.controller");
const create_bet_use_case_1 = require("./domain/use-cases/create-bet-use-case");
const database_module_1 = require("./infra/database/database.module");
const make_numbers_draw_use_case_1 = require("./domain/use-cases/make-numbers-draw-use-case");
const make_numbers_draw_controller_1 = require("./infra/controllers/make-numbers-draw.controller");
const list_valid_bets_controller_1 = require("./infra/controllers/list-valid-bets.controller");
const list_valid_bets_use_case_1 = require("./domain/use-cases/list-valid-bets-use-case");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            create_bet_controller_1.CreateBetController,
            make_numbers_draw_controller_1.MakeNumbersDrawController,
            list_valid_bets_controller_1.ListValidBetsController,
        ],
        providers: [create_bet_use_case_1.CreateBetUseCase, make_numbers_draw_use_case_1.MakeNumbersDrawUseCase, list_valid_bets_use_case_1.ListValidBetsUseCase],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map