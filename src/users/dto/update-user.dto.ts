import { IsEmail } from 'class-validator';
export class UpdateUserDto {
    public readonly nickname!: string;
    @IsEmail()
    public readonly email!: string;
    public readonly introduction!: string;
}
