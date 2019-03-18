import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolvers } from './user.resolvers';
import { UserSchema } from './user.schema';
import { UsersService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [UsersService, UserResolvers],
    exports: [UsersService]
})
export class UsersModule { }
