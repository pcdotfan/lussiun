import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as faker from 'faker';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { CategoriesService } from '../categories/categories.service';
import { ArticleSchema } from './article.schema';
import { ArticleDto } from './dto/article.dto';
import { ArticleSchema } from './interfa';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel('Article') private readonly articleModel: Model<Article>,
        private readonly categoriesService: CategoriesService
    ) { }

    public async findOneById(id: number): Promise<Article> {
        return await this.articleModel.findOne({ id });
    }

    public async findOneBySlug(slug: string): Promise<Article> {
        return await this.articleModel.findOne({ slug });
    }

    public async where(where: object, skip: number = 0, take: number = 59999): Promise<Article[]> {
        where = _.omitBy(where, _.isUndefined);
        return await this.articleModel.find(
            {
                where,
                take,
                skip,
                order: {
                    id: 'DESC',
                },
            });
    }

    public async findAll(): Promise<Article[]> {
        return await this.articleModel.find({
            order: {
                id: 'DESC',
            },
        });
    }

    public async create(articleDto: ArticleDto): Promise<Article> {
        const newArticle = await this.articleModel.create(articleDto);
        await this.categoriesService.countControl(articleDto.categoryId, true);
        return this.articleModel.save(newArticle);
    }

    public async update(id: number, articleDto: ArticleDto): Promise < any> {
        await this.articleModel.update(id, articleDto);
    }

    public async countControl(id: number, increment: boolean): Promise<any> {
        // 统计文章总量
        const currentArticle = await this.findOneById(id);
        if (increment) {
            currentArticle.commentCount++;
            return await currentArticle.save();
        }
        currentArticle.commentCount--;
        return await currentArticle.save();
    }

    public async destroy(id: number): Promise<any> {
        const articleDeleted = await this.findOneById(id);
        await this.categoriesService.countControl(articleDeleted.categoryId, false);
        await this.articleModel.delete(id);
    }

    public async mock(count: number, userId: number): Promise<any> {
        for (let i = 0; i <= count; i++) {
            const structure = {
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraphs(),
                status: 2,
                categoryId: this.getRandomInt(5, 7),
                slug: faker.lorem.word(),
                userId,
            };
            const newArticle = this.create(structure);
        }
    }

    public getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}
