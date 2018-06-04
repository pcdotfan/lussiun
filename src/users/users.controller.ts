import { Injectable, Inject, Post, Body, Controller, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../validation.pipe';

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
        const userExisted =
                await this.usersService.where({ username: createUserDto.username }) ||
                await this.usersService.where({ email: createUserDto.email });

        if (!userExisted) {
            const userCreated = await this.usersService.create(createUserDto);
            return userCreated;
        }

        throw new HttpException('已存在相同信息用户', HttpStatus.FORBIDDEN);
    }
}