import { IsInt, IsString, Max, Min } from 'class-validator';
import { ObjectID } from 'typeorm';
import { User } from '../../users/user.entity';

export class ArticleDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly slug: string;

    @IsString()
    readonly content: string;

    readonly categoryId: ObjectID;

    userId: ObjectID;

    @IsInt()
    @Min(-1)
    @Max(2) // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
    readonly status: number;
}
