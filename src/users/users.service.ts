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

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    async where(condition: object): Promise<User[]> {
        return await this.userRepository.find(condition);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneByToken(): Promise<User> {
        return await this.userRepository.findOne();
    }
}