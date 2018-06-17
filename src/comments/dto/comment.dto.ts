import { ValidateIf, IsString, IsInt, IsEmail, Min, Max } from 'class-validator';
export class CommentDto {
    // 登录用户只需填写 userId，游客必填内容为姓名 / 邮箱 / 内容
    // readonly userId: number;
    // readonly parentId: number;
    ip: string;

    @Min(-1)
    @Max(1)
    type: number;

    @IsInt()
    readonly articleId: number;

    // @ValidateIf(o => o.userId === null)
    @IsString()
    readonly name: string;

    // @ValidateIf(o => o.userId === null)
    @IsEmail()
    readonly email: string;

    content: string;

    readonly website: string;
}