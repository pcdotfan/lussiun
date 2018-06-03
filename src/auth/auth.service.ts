import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private config: ConfigService,
    ) { }

    async createToken(id: number) {
        const user: JwtPayload = { id };
        return jwt.sign(
            user,
            this.config.get('JWT_SECRET_KEY'),
            { expiresIn: 3600 });
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneById(payload.id);
    }
}