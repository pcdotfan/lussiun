import { IsString } from 'class-validator';
export class CategoryDto {
    @IsString()
    public readonly name!: string;

    @IsString()
    public readonly slug!: string;

    public readonly description!: string;
    public readonly count: number;
}
