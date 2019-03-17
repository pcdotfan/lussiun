import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
    public readonly username!: string;

    public readonly nickname!: string;

    @IsEmail()
    public readonly email!: string;

    @MinLength(6, {
        message: '密码过短，请重新输入',
    })
    public password!: string;

    public readonly introduction!: string;
}
