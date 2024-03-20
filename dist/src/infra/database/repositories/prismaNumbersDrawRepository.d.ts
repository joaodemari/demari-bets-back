import { NumbersDrawEntity } from '../../../domain/entities/numbersDraw';
import { NumbersDrawRepository } from '../../../domain/repositories/numbersDrawRepository';
import { PrismaService } from '../prisma.service';
export declare class PrismaNumbersDrawRepository implements NumbersDrawRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    makeNumbersDraw(numbersDraw: NumbersDrawEntity): Promise<void>;
}
