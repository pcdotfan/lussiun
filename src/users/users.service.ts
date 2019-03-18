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
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    public async create(user: CreateUserDto): Promise<User> {
        user.password = await argon2.hash(user.password);
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    public async findOneById(id: ObjectId): Promise<User> {
        return await this.userModel.findOne({ id }).exec();
    }

    public async match(condition: { username: string, password: string }): Promise<User | null> {
        const user = await this.userModel.findOne({ username: condition.username }).exec();
        if (await argon2.verify(user.password, condition.password)) {
            return user;
        }
        return null;
    }

    public async where(condition: object): Promise<User[]> {
        return await this.userModel.find(condition).exec();
    }

    public async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    public async update(id: ObjectId, object: object): Promise<any> {
        return await this.userModel.update({id}, object).exec();
    }

    public async changePassword(id: ObjectId, password: string): Promise<User> {
        return await this.userModel.findOneAndUpdate({id}, {password: await argon2.hash(password)}).exec();
    }

    public async delete(username: string): Promise<User> {
        return await this.userModel.findOneAndRemove(username).exec();
    }
}
