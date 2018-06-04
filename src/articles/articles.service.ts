import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
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

    async create(articleDto: ArticleDto): Promise<Article> {
        const newArticle = await this.articleRepository.create(articleDto);
        return this.articleRepository.save(newArticle);
    }

    async update(id: number, articleDto: ArticleDto): Promise<any> {
        await this.articleRepository.update(id, articleDto);
    }

    async destroy(id: number): Promise<any> {
        await this.articleRepository.delete(id);
    }
}