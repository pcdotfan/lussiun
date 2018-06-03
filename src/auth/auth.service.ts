import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async createToken(id: number) {
        const user: JwtPayload = { id };
        return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
    }

    async validateUser(token: any): Promise<any> {
        return await this.usersService.findOneByToken();
    }
}