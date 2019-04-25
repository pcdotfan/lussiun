import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { ObjectID, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(user: CreateUserDto): Promise<User> {
        user.password = await argon2.hash(user.password);
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async findOneById(id: ObjectID): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    async match(condition: { username: string, password: string }): Promise<User | false> {
        const user = await this.userRepository.findOne({ username: condition.username });
        if (user && await argon2.verify(user.password, condition.password)) {
            return user;
        }
        return false;
    }

    async where(condition: object): Promise<User[]> {
        return await this.userRepository.find(condition);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(id: ObjectID, object: object): Promise<any> {
        return await this.userRepository.update(id, object);
    }

    async changePassword(id: ObjectID, password: string): Promise<any> {
        const userExisted = await this.findOneById(id);
        if (userExisted) {
            userExisted.password = await argon2.hash(userExisted.password);
            return await this.userRepository.save(userExisted);
        }
    }
}
