import { Controller, Get, Param, Patch, Post, Body, UsePipes, Req, HttpException, HttpStatus, Injectable, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt.guard';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { ValidationPipe } from '../validation.pipe';
import * as _ from 'lodash';
import * as gravatar from 'gravatar';

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
    @UseGuards(new JwtAuthGuard())
    async findAll(@Req() request): Promise<Comment[]> {
        const page: number = request.query.page || 1;
        const articleId: number | undefined = request.query.article || undefined;
        const limit: number = request.query.limit || 10;
        const type: number = request.user ? (request.query.type || 1) : 1;
        let comments = [];
        const conditions: object = {
            articleId,
            type,
        };

        comments = await this.commentsService.where(conditions, (page - 1) * limit, limit);
        await Promise.all(
            // 参考 egg-cnode 的写法，用 Promise.all 的方法让 Array.map 内部可异步
            comments.map(async comment => {
                let article = await comment.article;
                const avatar = gravatar.url(comment.email);
                article = _.pick(article, ['title']);
                return  _.assign(comment, { avatar }, { article });
            }),
        );

        return comments;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Req() request, @Body() commentDto: CommentDto) {
        commentDto.ip = request.ip;
        commentDto.type = 1;
        return await this.commentsService.create(commentDto);
    }

    // 暂时不允许更改 @Patch(':id')
    @UseGuards(new JwtAuthGuard())
    async update(@Param() id: number, @Body() commentDto: CommentDto): Promise<Comment> {
        return await this.commentsService.update(id, commentDto);
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return await this.commentsService.findOneById(id);
    }

    @Delete(':id')
    @UseGuards(new JwtAuthGuard())
    async destory(@Param('id') id) {
        return await this.commentsService.destroy(id);
    }
}