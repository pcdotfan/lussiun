import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async findOneById(id: number): Promise<Comment> {
        return await this.commentRepository.findOne({ id });
    }

    async findSomeByArticleId(id: number): Promise<Comment[]> {
        return await this.where({ articleId: id });
    }

    async where(condition: object): Promise<Comment[]> {
        return await this.commentRepository.find(condition);
    }

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    async create(commentDto: CommentDto): Promise<Comment> {
        const newComment = await this.commentRepository.create(commentDto);
        return this.commentRepository.save(newComment);
    }

    async update(id: number, commentDto: CommentDto): Promise<any> {
        await this.commentRepository.update(id, commentDto);
    }

    async destroy(id: number): Promise<any> {
        await this.commentRepository.delete(id);
    }
}