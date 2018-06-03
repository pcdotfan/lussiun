import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(user: object): Promise<User> {
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    async where(condition: object): Promise<User[]> {
        return await this.userRepository.find(condition);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(id: number, object: object): Promise<any> {
        return this.userRepository.update(id, object);
    }
}