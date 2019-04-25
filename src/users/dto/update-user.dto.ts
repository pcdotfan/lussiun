import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class UpdateUserDto {
    readonly nickname: string;
    @IsEmail()
    readonly email: string;
    readonly introduction: string;
}
