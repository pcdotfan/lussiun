import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async createToken(id: number) {
        const user: JwtPayload = { id };
        return jwt.sign(
            user,
            'vy1C%iZ8W+`]X9#vQl}:/78ul:,CjXcV5{%b-W|_Nty$tGbDnaRGRpJ]e_MkR+O0',
            { expiresIn: 3600 });
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneById(payload.id);
    }
}