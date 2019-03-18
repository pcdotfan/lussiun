import { Body, Controller,
    Delete, Get, HttpException, HttpStatus, Injectable, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from '../jwt.guard';
import { ValidationPipe } from '../validation.pipe';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './category.schema';
import { CategoryDto } from './dto/category.dto';
import { Category } from './interfaces/category.interface';

const pubSub = new PubSub();

@Resolver('Category')
export class CategoryResolvers {
    constructor(
        private readonly categoriesService: CategoriesService    ) { }

    @Get()
    public async findAll(): Promise<Category[]> {
        return await this.categoriesService.findAll();
    }

    @Post()
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    public async create(@Body() categoryDto: CategoryDto) {
        const categoryExisted = await this.categoriesService.where({ slug: categoryDto.slug });
        if (categoryExisted.length === 0) {
            return await this.categoriesService.create(categoryDto);
        }

        throw new HttpException('已存在相同信息分类', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(new JwtAuthGuard())
    public async update(@Param() id: number, @Body() categoryDto: CategoryDto): Promise<Category> {
        return await this.categoriesService.update(id, categoryDto);
    }

    @Get(':id')
    public async findOne(@Param('id') id) {
        return await this.categoriesService.findOneById(id);
    }

    @Delete(':id')
    public async destory(@Param('id') id) {
        const articles = await this.articleRepository.find({ categoryId: id });
        if (articles.length === 0) {
            return await this.categoriesService.destroy(id);
        }
        throw new HttpException('分类目录内仍有文章，请删除后再试', HttpStatus.FORBIDDEN);
    }
}
