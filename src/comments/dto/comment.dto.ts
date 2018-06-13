import { ValidateIf, IsString, IsInt, IsEmail } from 'class-validator';
export class CommentDto {
    // 登录用户只需填写 userId，游客必填内容为姓名和内容
    userId: number;
    parentId: number;

    @IsInt()
    articleId: number;

    @ValidateIf(o => o.userId === null)
    @IsString()
    name: string;

    @ValidateIf(o => o.userId === null)
    @IsEmail()
    email: string;

    website: string;
}