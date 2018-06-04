import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) { }

    async findOneById(id: number): Promise<Article> {
        return await this.articleRepository.findOne({ id });
    }

    async findOneBySlug(slug: string): Promise<Article> {
        return await this.articleRepository.findOne({ slug });
    }

    async where(condition: object): Promise<Article[]> {
        return await this.articleRepository.find(condition);
    }

    async findAll(): Promise<Article[]> {
        return await this.articleRepository.find();
    }

    async create(article: CreateArticleDto): Promise<Article> {
        const newArticle = await this.articleRepository.create(article);
        return this.articleRepository.save(newArticle);
    }

    async update(id: number, article): Promise<Article> {
        // body = _.omit(body, ['id'])
        // return await this.articleRepository.update(id, article);
        return;
    }
}