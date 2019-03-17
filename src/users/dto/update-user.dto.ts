import { ObjectID } from 'bson';
import { IsEmail } from 'class-validator';
export class UpdateUserDto {
    public readonly id!: ObjectID;
    public readonly nickname!: string;
    @IsEmail()
    public readonly email!: string;
    public readonly introduction!: string;
}
