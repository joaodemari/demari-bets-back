import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createBetRequestSchema = z.object({
  user_name: z.string(),
  user_cpf: z.string().length(14),
  numbers: z.array(z.number()),
  surprise: z.boolean(),
});

export class CreateBetRequestDTO extends createZodDto(createBetRequestSchema) {}
