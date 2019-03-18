import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import * as _ from 'lodash';
import { JwtAuthGuard } from '../jwt.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const pubSub = new PubSub();

@Resolver('Auth')
export class AuthResolvers {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Query('user')
    @UseGuards(new JwtAuthGuard())
    public async user(@Req() request: any): Promise<object> {
        return { user: { id: request.user.id } };
    }

    @Query('profile')
    @UseGuards(new JwtAuthGuard())
    public async profile(@Req() request: any): Promise<object> {
        return _.pick(request.user, ['username', 'nickname', 'email', 'introduction']);
    }

    @Mutation('register')
    public async register(@Args('createUserInput') createUserDto: CreateUserDto): Promise<object> {
        return await this.usersService.create(createUserDto);
    }

    @Mutation('login')
    public async login(@Body() body: any): Promise<object> {
        const credentials = {
            username: body.username,
            password: body.password,
        };
        const userMatched = await this.usersService.match(credentials);
        return {
            token: await this.authService.createToken(userMatched.id, body.remember),
        };
    }

    @Mutation('changePassword')
    @UseGuards(new JwtAuthGuard())
    public async changePassword(@Req() request: any, @Body() body: any): Promise<object> {
        return await this.usersService.changePassword(request.user.id, body.password);
    }

    @Mutation('logout')
    @UseGuards(new JwtAuthGuard())
    public async logout(): Promise<object> {
        return {
            message: 'OK',
        };
    }
}
