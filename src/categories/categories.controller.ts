import { Controller, Get, Param, Patch, Post, Body, UsePipes, HttpException, HttpStatus, Injectable, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async create(@Body() categoryDto: CategoryDto) {
        const categoryExisted = await this.categoriesService.where({ slug: categoryDto.slug });
        if (categoryExisted.length === 0) {
            return await this.categoriesService.create(categoryDto);
        }

        throw new HttpException('已存在相同信息分类', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param() id: number, @Body() categoryDto: CategoryDto): Promise<Category> {
        return await this.categoriesService.update(id, categoryDto);
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return await this.categoriesService.findOneById(id);
    }

    @Delete(':id')
    async destory(@Param('id') id) {
        return await this.categoriesService.destroy(id);
    }
}