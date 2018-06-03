import { Controller, Get, Param, Patch, Post, Body } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

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