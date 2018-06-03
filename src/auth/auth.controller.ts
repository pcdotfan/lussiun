import { Injectable, Inject, Get, Body, Controller, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
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
    async user(): Promise<object> {
        // const payload = await this.authService.getPayload();
        return {
            user: {
                // id: payload.id,
            },
        };
    }
}