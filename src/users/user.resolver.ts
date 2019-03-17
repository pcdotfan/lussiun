import { Body,
    HttpException,
    HttpStatus,
    Param, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from '../jwt.guard';
import { ValidationPipe } from '../validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

const pubSub = new PubSub();

@Resolver('User')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Mutation('createUser')
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    public async create(@Args('createUserInput') createUserDto: CreateUserDto): Promise<User> {
        const userExisted =
                await this.usersService.where({ username: createUserDto.username }) ||
                await this.usersService.where({ email: createUserDto.email });

        if (userExisted !== []) {
            return await this.usersService.create(createUserDto);
        }

        throw new HttpException('存在相同用户', HttpStatus.FORBIDDEN);
    }

    @Subscription('userCreated')
    public userCreated() {
      return pubSub.asyncIterator('userCreated');
    }

    @Mutation('updateUser')
    @UseGuards(new JwtAuthGuard())
    public async update(@Args('updateUserInput') updateUserDto: UpdateUserDto): Promise<any> {
        return await this.usersService.update(updateUserDto.id, updateUserDto);
    }

}
