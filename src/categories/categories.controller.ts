import { Controller, Get, Param, Patch, Post, Body, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { ValidationPipe } from '../validation.pipe';

@Controller('categories')
export class CategoriesController {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesService: CategoriesService,
    ) { }

    @Get()
    async findAll(): Promise<Category[]> {
        return;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const categoryExisted =
            await this.categoriesService.where({ slug: createCategoryDto.slug });

        if (!categoryExisted) {
            return await this.categoriesService.create(createCategoryDto);
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