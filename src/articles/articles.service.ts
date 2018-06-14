import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { ArticleDto } from './dto/article.dto';
import { Article } from './article.entity';
import * as faker from 'faker';
import * as _ from 'lodash';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService,
    ) { }

    async findOneById(id: number): Promise<Article> {
        return await this.articleRepository.findOne({ id });
    }

    async findOneBySlug(slug: string): Promise<Article> {
        return await this.articleRepository.findOne({ slug });
    }

    async where(where: object, skip: number = 0, take: number = 59999): Promise<Article[]> {
        where = _.omitBy(where, _.isUndefined);
        return await this.articleRepository.find({ where, take, skip });
    }

    async findAll(): Promise<Article[]> {
        return await this.articleRepository.find();
    }

    async create(articleDto: ArticleDto): Promise<Article> {
        const newArticle = await this.articleRepository.create(articleDto);
        return this.articleRepository.save(newArticle);
    }

    async update(id: number, articleDto: ArticleDto): Promise < any> {
        await this.articleRepository.update(id, articleDto);
    }

    async countControl(id: number, increment: boolean): Promise<any> {
        // 统计文章总量
        const currentArticle = await this.findOneById(id);
        if (increment) {
            currentArticle.commentCount++;
            return await currentArticle.save();
        }
        currentArticle.commentCount--;
        return await currentArticle.save();
    }

    async destroy(id: number): Promise<any> {
        const articleDeleted = await this.findOneById(id);
        await this.categoriesService.countControl(articleDeleted.categoryId, false);
        await this.articleRepository.delete(id);
    }

    async mock(count: number, userId: number): Promise<any> {
        for (let i = 0; i <= count; i++) {
            const structure = {
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraphs(),
                status: this.getRandomInt(-1, 2),
                categoryId: this.getRandomInt(5, 7),
                slug: faker.lorem.word(),
                userId,
            };
            const newArticle = this.create(structure);
        }
    }

    getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}