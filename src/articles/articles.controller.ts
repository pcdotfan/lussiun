import { Controller, Get, Param, Patch, Post, Req, Body, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { Article } from './article.entity';
import { ValidationPipe } from '../validation.pipe';
import * as _ from 'lodash';
import * as gravatar from 'gravatar';

@Controller('articles')
export class ArticlesController {
    constructor(
        @InjectRepository(Article)
        private readonly articlesService: ArticlesService,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService,
    ) { }

    @Get()
    async findAll(@Req() request): Promise<Article[]> {
        const articles = await this.articlesService.where({ status: request.query.status });

        // 参考 egg-cnode 的写法，用 Promise.all 的方法让 Array.map 内部可异步
        await Promise.all(
            articles.map(async article => {
                const [user, category] = [
                    await this.usersService.findOneById(article.userId),
                    await this.categoriesService.findOneById(article.categoryId),
                ];
                const avatar = gravatar.url(user.email);
                article = _.assign(article, user, category);
            }),
        );

        return articles;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createArticleDto: CreateArticleDto) {
        const articleExisted =
            await this.articlesService.where({ slug: createArticleDto.slug });

        if (!articleExisted) {
            return await this.articlesService.create(createArticleDto);
        }

        throw new HttpException('已存在相同信息分类', HttpStatus.FORBIDDEN);
    }

    @Patch()
    update() {

    }

    @Get(':id')
    findOne(@Param('id') id) {
    }
}