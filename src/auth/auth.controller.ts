import { Injectable, Inject, Get, Body, Controller, UsePipes, UseGuards, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
@Controller('auth')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Get('user')
    async user(@Req() request): Promise<object> {
        return request.user;
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
}