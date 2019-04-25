import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async findOneById(id: ObjectID): Promise<Category> {
        return await this.categoryRepository.findOne({ id });
    }

    async findOneBySlug(slug: string): Promise<Category> {
        return await this.categoryRepository.findOne({ slug });
    }

    async where(condition: object): Promise<Category[]> {
        return await this.categoryRepository.find(condition);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async create(categoryDto: CategoryDto): Promise<Category> {
        const newCategory = await this.categoryRepository.create(categoryDto);
        return this.categoryRepository.save(newCategory);
    }

    async update(id: ObjectID, categoryDto: CategoryDto): Promise<any> {
        await this.categoryRepository.update(id, categoryDto);
    }

    async countControl(id: ObjectID, increment: boolean): Promise<any> {
        // 统计文章总量
        const currentCategory = await this.findOneById(id);
        if (increment) {
            currentCategory.count++;
            return await currentCategory.save();
        }
        currentCategory.count--;
        return await currentCategory.save();
    }

    async destroy(id: ObjectID): Promise<any> {
        await this.categoryRepository.delete(id);
    }
}
