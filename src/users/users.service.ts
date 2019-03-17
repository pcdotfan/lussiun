import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async create(user: CreateUserDto): Promise<User> {
        user.password = await argon2.hash(user.password);
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    public async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    public async match(condition: { username: string, password: string }): Promise<User> {
        const user = await this.userRepository.findOne({ username: condition.username });
        if (user && await argon2.verify(user.password, condition.password)) {
            return user;
        }
    }

    public async where(condition: object): Promise<User[]> {
        return await this.userRepository.find(condition);
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async update(id: number, object: object): Promise<any> {
        return await this.userRepository.update(id, object);
    }

    public async changePassword(id: number, password: string): Promise<any> {
        const userExisted = await this.findOneById(id);
        if (userExisted) {
            userExisted.password = await argon2.hash(userExisted.password);
            return await this.userRepository.save(userExisted);
        }
    }
}
