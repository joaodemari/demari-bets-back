"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBetRequestDTO = exports.createBetRequestSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.createBetRequestSchema = zod_1.z.object({
    user_name: zod_1.z.string(),
    user_cpf: zod_1.z.string().length(14),
    numbers: zod_1.z.array(zod_1.z.number()),
    surprise: zod_1.z.boolean(),
});
class CreateBetRequestDTO extends (0, nestjs_zod_1.createZodDto)(exports.createBetRequestSchema) {
}
exports.CreateBetRequestDTO = CreateBetRequestDTO;
//# sourceMappingURL=createBetRequestDTO.js.map