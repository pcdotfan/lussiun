import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async findOneById(id: number): Promise<Category> {
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
}