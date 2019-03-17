import * as mongoose from 'mongoose';
import { Article } from '../articles/article.entity';

export const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    description: String,
    // @OneToMany((type) => Article, (article) => article.category)
    // public articles: Promise<Article[]>;
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'  } });
