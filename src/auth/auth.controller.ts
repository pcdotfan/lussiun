import { Injectable, Inject, Get, Body, Controller, UsePipes, UseGuards, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Get('user')
    async user(@Req() request): Promise<object> {
        return request.user;
    }

    @Post('login')
    async login(@Body() body): Promise<any> {
        const credentials = {
            username: body.username,
            password: body.password,
        };
        const token = this.authService.createToken(credentials, body.remember);
        if (token) {
            return token;
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

    @Get('logout')
    async logout(): Promise<object> {
        return {
            message: 'OK',
        };
    }
}