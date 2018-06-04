import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
// import argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        // private config: ConfigService,
    ) { }

    async createToken(credentials: { username: string, password: string }, remember: boolean = false): Promise<string> {
        const user = await this.usersService.match(
            {
                username: credentials.username,
                password: 1, // await argon2.hash(credentials.password),
            });

        if (user) {
            const jwtUser: JwtPayload = { id: user.id };
            const expiresIn = remember ? '1d' : '1h';

            return jwt.sign(
                jwtUser,
                // this.config.get('JWT_SECRET_KEY'),
                { expiresIn });
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneById(payload.id);
    }

}