import { IsInt, IsString, Max, Min } from 'class-validator';
// import { User } from '../../users/user.entity';

export class ArticleDto {
    @IsString()
    public readonly title!: string;

    @IsString()
    public readonly slug!: string;

    @IsString()
    public readonly content!: string;

    public readonly categoryId!: number;

    public userId!: number;

    @IsInt()
    @Min(-1)
    @Max(2) // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
    public readonly status!: number;
}
