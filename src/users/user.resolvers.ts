import { UseGuards, UsePipes } from '@nestjs/common';
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
export class UserResolvers {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Mutation('createUser')
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    public async create(@Args('createUserInput') createUserDto: CreateUserDto): Promise<User> {
        const userCreated = await this.usersService.create(createUserDto);
        pubSub.publish('userCreated', { userCreated });
        return userCreated;
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
