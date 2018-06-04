import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private config: ConfigService,
    ) { }

    async createToken(credentials: { username: string, password: string }, rememberMe: boolean = false): Promise<string> {
        const user = await this.usersService.match(
            {
                username: credentials.username,
                password: await argon2.hash(credentials.password),
            });

        if (user) {
            const jwtUser: JwtPayload = { id: user.id };
            const expiresIn = rememberMe ? '1d' : '1h';

            return jwt.sign(
                jwtUser,
                this.config.get('JWT_SECRET_KEY'),
                { expiresIn });
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneById(payload.id);
    }

}