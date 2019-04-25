import { IsString } from 'class-validator';
export class CategoryDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly slug: string;

    readonly description: string;
}