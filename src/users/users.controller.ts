import { Injectable, Inject, Post, Body, Controller, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../validation.pipe';
import * as argon2 from 'argon2';

@Injectable()
@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService,
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await argon2.hash(createUserDto.password);
        const userCreated = await this.usersService.create(createUserDto);

        return {
            message: 'Success!',
            userCreated,
        };
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({ id });
    }
}