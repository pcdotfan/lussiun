import { Body, Controller, HttpException, HttpStatus, Inject, Injectable, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { JwtAuthGuard } from '../jwt.guard';
import { ValidationPipe } from '../validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Injectable()
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post()
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const userExisted =
                await this.usersService.where({ username: createUserDto.username }) ||
                await this.usersService.where({ email: createUserDto.email });

        if (userExisted !== []) {
            return await this.usersService.create(createUserDto);
        }

        throw new HttpException('存在相同用户', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(new JwtAuthGuard())
    async update(@Param() id: ObjectID, @Body() updateUserDto: UpdateUserDto): Promise<any> {
        await this.usersService.update(id, updateUserDto);
        return;
    }

}
