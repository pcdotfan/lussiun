import { Controller, Get, Param, Patch, Post, Body, UsePipes, Req, HttpException, HttpStatus, Injectable, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { ValidationPipe } from '../validation.pipe';

/*
    增：登录 / 未登录
    删：登录 / (Cookie 判断用户)
    改：登录 / (Cookie 判断用户)
    查：id
*/

@Injectable()
@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
    ) { }

    @Get()
    async findAll(): Promise<Comment[]> {
        return await this.commentsService.findAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Req() request, @Body() commentDto: CommentDto) {
        commentDto.ip = request.ip as string;
        return await this.commentsService.create(commentDto);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param() id: number, @Body() commentDto: CommentDto): Promise<Comment> {
        return await this.commentsService.update(id, commentDto);
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return await this.commentsService.findOneById(id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async destory(@Param('id') id) {
        return await this.commentsService.destroy(id);
    }
}