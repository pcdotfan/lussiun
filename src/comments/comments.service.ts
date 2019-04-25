import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) { }

    async findOneById(id: string): Promise<Comment> {
        return await this.commentRepository.findOne({ id });
    }

    async findSomeByArticleId(id: string): Promise<Comment[]> {
        return await this.where({ articleId: id });
    }

    async where(where: object, skip: number = 0, take: number = 59999): Promise<Comment[]> {
        where = _.omitBy(where, _.isUndefined);
        return await this.commentRepository.find(
            {
                where,
                take,
                skip,
                order: {
                    id: 'DESC',
                },
            });
    }
    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    async create(commentDto: CommentDto): Promise<Comment> {
        const newComment = await this.commentRepository.create(commentDto);
        return this.commentRepository.save(newComment);
    }

    async update(id: string, commentDto: CommentDto): Promise<any> {
        await this.commentRepository.update(id, commentDto);
    }

    async destroy(id: string): Promise<any> {
        await this.commentRepository.delete(id);
    }
}
