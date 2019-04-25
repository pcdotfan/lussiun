import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Post, Req, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { JwtAuthGuard } from '../jwt.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Get('user')
    @UseGuards(new JwtAuthGuard())
    async user(@Req() request: any): Promise<object> {
        return { user: { id: request.user.id } };
    }

    @Get('profile')
    @UseGuards(new JwtAuthGuard())
    async profile(@Req() request: any): Promise<object> {
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
    async login(@Body() body: any): Promise<object> {
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

        throw new HttpException('用户名或密码错误', HttpStatus.FORBIDDEN);
    }

    @Post('changepassword')
    @UseGuards(new JwtAuthGuard())
    async changePassword(@Req() request: any, @Body() body: any): Promise<object> {
        const user = await this.usersService.changePassword(request.user.id, body.password);
        if (user) {
            return user;
        }
        throw new HttpException('未找到用户', HttpStatus.FORBIDDEN);
    }

    @Post('logout')
    @UseGuards(new JwtAuthGuard())
    async logout(): Promise<object> {
        return {
            message: 'OK',
        };
    }
}
