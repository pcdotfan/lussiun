import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
// import { UsersModule } from '../users/users.module';

@Module({
    // imports: [UsersModule],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }