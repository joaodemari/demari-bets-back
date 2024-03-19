import { z } from 'zod';
export declare const createBetRequestSchema: z.ZodObject<{
    user_name: z.ZodString;
    user_cpf: z.ZodString;
    numbers: z.ZodArray<z.ZodNumber, "many">;
    surprise: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    user_name?: string;
    user_cpf?: string;
    numbers?: number[];
    surprise?: boolean;
}, {
    user_name?: string;
    user_cpf?: string;
    numbers?: number[];
    surprise?: boolean;
}>;
declare const CreateBetRequestDTO_base: import("nestjs-zod").ZodDto<{
    user_name?: string;
    user_cpf?: string;
    numbers?: number[];
    surprise?: boolean;
}, z.ZodObjectDef<{
    user_name: z.ZodString;
    user_cpf: z.ZodString;
    numbers: z.ZodArray<z.ZodNumber, "many">;
    surprise: z.ZodBoolean;
}, "strip", z.ZodTypeAny>, {
    user_name?: string;
    user_cpf?: string;
    numbers?: number[];
    surprise?: boolean;
}>;
export declare class CreateBetRequestDTO extends CreateBetRequestDTO_base {
}
export {};
