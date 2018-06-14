import { Injectable, Inject, Get, Body, Controller, UsePipes, UseGuards, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { CreateUserDto } from 'users/dto/create-user.dto';

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Get('auth')
    @UseGuards(AuthGuard('jwt', {
        callback: (err, user, info) => {
            // 即使用户不存在也同样不 抛出错误
            return user;
        },
    }))
    async gen(@Req() request) {
        return request.user;
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    async user(@Req() request): Promise<object> {
        return { user: { id: request.user.id } };
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async profile(@Req() request): Promise<object> {
        return _.pick(request.user, ['username', 'nickname', 'email', 'introduction']);
    }

    @Post('register') // 测试用
    async register(@Body() createUserDto: CreateUserDto): Promise<object> {
        const userMatched = await this.usersService.match(createUserDto);

        if (!userMatched) {
            return await this.usersService.create(createUserDto);
        }

        throw new HttpException('已存在相同用户', HttpStatus.FORBIDDEN);
    }

    @Post('login')
    async login(@Body() body): Promise<object> {
        const credentials = {
            username: body.username,
            password: body.password,
        };
        const userMatched = await this.usersService.match(credentials);

        if (userMatched) {
            return {
                token: await this.authService.createToken(userMatched.id, body.remember),
            };
        }

        throw new HttpException('信息不匹配', HttpStatus.FORBIDDEN);
    }

    @Post('changepassword')
    @UseGuards(AuthGuard('jwt'))
    async changePassword(@Req() request, @Body() body): Promise<object> {
        const user = await this.usersService.changePassword(request.user.id, body.password);
        if (user) {
            return user;
        }
        throw new HttpException('未找到用户', HttpStatus.FORBIDDEN);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(): Promise<object> {
        return {
            message: 'OK',
        };
    }
}