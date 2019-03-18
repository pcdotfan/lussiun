import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import { Category } from './interfaces/category.interface';
import { ObjectId } from 'bson';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>
    ) { }

    public async findOneById(id: ObjectId): Promise<Category> {
        return await this.categoryModel.findOne({ id }).exec();
    }

    public async findOneBySlug(slug: string): Promise<Category> {
        return await this.categoryModel.findOne({ slug }).exec();
    }

    public async where(condition: object): Promise<Category[]> {
        return await this.categoryModel.find(condition);
    }

    public async findAll(): Promise<Category[]> {
        return await this.categoryModel.find();
    }

    public async create(categoryDto: CategoryDto): Promise<Category> {
        const newCategory = new this.categoryModel(categoryDto);
        return await newCategory.save();
    }

    public async update(id: ObjectId, categoryDto: CategoryDto): Promise<any> {
        return await this.categoryModel.update(id, categoryDto);
    }

    public async countControl(id: ObjectId, increment: boolean): Promise<any> {
        // 统计文章总量
        const currentCategory = await this.findOneById(id);
        if (increment) {
            currentCategory.count++;
            return await currentCategory.save();
        }
        currentCategory.count--;
        return await currentCategory.save();
    }

    public async destroy(id: ObjectId): Promise<any> {
        await this.categoryModel.delete(id);
    }
}
