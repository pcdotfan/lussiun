import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    public async create(user: CreateUserDto): Promise<User> {
        user.password = await argon2.hash(user.password);
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    public async findOneById(id: number): Promise<User | null> {
        return await this.userModel.findOne({ id });
    }

    public async match(condition: { username: string, password: string }): Promise<User | false> {
        const user = await this.userModel.findOne({ username: condition.username });
        if (user && await argon2.verify(user.password, condition.password)) {
            return user;
        }
        return false;
    }

    public async where(condition: object): Promise<User[]> {
        return await this.userModel.find(condition);
    }

    public async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    public async update(id: ObjectId, object: object): Promise<any> {
        return await this.userModel.update({id}, object);
    }

    public async changePassword(id: number, password: string): Promise<any> {
        return await this.userModel.findOneAndUpdate({id}, {password: await argon2.hash(password)});
    }
}
