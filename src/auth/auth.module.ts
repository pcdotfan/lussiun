import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [UsersModule],
    providers: [AuthService, JwtStrategy, AuthResolvers],
})
export class AuthModule { }
