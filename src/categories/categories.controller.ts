import { Controller, Get, Param, Patch, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

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
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        // return await this.categoriesService.create(createCategoryDto);
    }

    @Patch()
    update() {

    }

    @Get(':id')
    findOne(@Param('id') id) {
    }
}