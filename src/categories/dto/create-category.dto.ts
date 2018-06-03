import { IsString, IsInt, MinLength } from 'class-validator';
export class CreateCategoryDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly slug: string;

    readonly description: string;
}