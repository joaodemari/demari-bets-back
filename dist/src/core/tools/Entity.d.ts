export declare abstract class Entity<Props> {
    private _id;
    protected props: Props;
    get id(): string;
    protected constructor(props: Props, id?: string);
    equals(entity: Entity<unknown>): boolean;
}
