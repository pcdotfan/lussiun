import { IsString, IsInt, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
    readonly nickname: string;
    @IsEmail()
    readonly email: string;
    readonly introduction: string;
}