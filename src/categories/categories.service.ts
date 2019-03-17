import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>
    ) { }

    public async findOneById(id: number): Promise<Category> {
        return await this.categoryModel.findOne({ id });
    }

    public async findOneBySlug(slug: string): Promise<Category> {
        return await this.categoryModel.findOne({ slug });
    }

    public async where(condition: object): Promise<Category[]> {
        return await this.categoryModel.find(condition);
    }

    public async findAll(): Promise<Category[]> {
        return await this.categoryModel.find();
    }

    public async create(categoryDto: CategoryDto): Promise<Category> {
        const newCategory = await this.categoryModel.create(categoryDto);
        return this.categoryModel.save(newCategory);
    }

    public async update(id: number, categoryDto: CategoryDto): Promise<any> {
        await this.categoryModel.update(id, categoryDto);
    }

    public async countControl(id: number, increment: boolean): Promise<any> {
        // 统计文章总量
        const currentCategory = await this.findOneById(id);
        if (increment) {
            currentCategory.count++;
            return await currentCategory.save();
        }
        currentCategory.count--;
        return await currentCategory.save();
    }

    public async destroy(id: number): Promise<any> {
        await this.categoryModel.delete(id);
    }
}
