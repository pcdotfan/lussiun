import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ObjectId } from 'bson';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private config: ConfigService,
    ) { }

    public async createToken(id: ObjectId, remember: boolean = false): Promise<string> {
        const jwtUser: JwtPayload = { id };
        const expiresIn = remember ? '1d' : '1h';

        return jwt.sign(
            jwtUser,
            this.config.get('JWT_SECRET_KEY'),
            { expiresIn });
    }

    public async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneById(payload.id);
    }

}
