import { IsString, IsInt, MinLength, Min, Max } from 'class-validator';
export class CreateArticleDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly slug: string;

    @IsString()
    readonly content: string;

    @IsInt()
    @Min(-1)
    @Max(2) // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
    readonly status: number;
}