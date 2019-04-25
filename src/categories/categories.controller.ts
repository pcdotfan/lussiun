import { Body, Controller, Delete, Get, HttpException, HttpStatus, Injectable, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Article } from '../articles/article.entity';
import { JwtAuthGuard } from '../jwt.guard';
import { ValidationPipe } from '../validation.pipe';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoriesService.findAll();
    }

    @Post()
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    async create(@Body() categoryDto: CategoryDto) {
        const categoryExisted = await this.categoriesService.where({ slug: categoryDto.slug });
        if (categoryExisted.length === 0) {
            return await this.categoriesService.create(categoryDto);
        }

        throw new HttpException('已存在相同信息分类', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(new JwtAuthGuard())
    async update(@Param() id: ObjectID, @Body() categoryDto: CategoryDto): Promise<Category> {
        return await this.categoriesService.update(id, categoryDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: ObjectID) {
        return await this.categoriesService.findOneById(id);
    }

    @Delete(':id')
    async destory(@Param('id') id: ObjectID) {
        const articles = await this.articleRepository.find({ categoryId: id });
        if (articles.length === 0) {
            return await this.categoriesService.destroy(id);
        }
        throw new HttpException('分类目录内仍有文章，请删除后再试', HttpStatus.FORBIDDEN);
    }
}
