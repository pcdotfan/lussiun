import { Controller, Get, Param, Patch, Post, Body, UsePipes, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { ValidationPipe } from '../validation.pipe';

@Injectable()
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
    ) { }

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoriesService.findAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() categoryDto: CategoryDto) {
        const categoryExisted = await this.categoriesService.where({ slug: categoryDto.slug });
        if (categoryExisted === []) {
            return await this.categoriesService.create(categoryDto);
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