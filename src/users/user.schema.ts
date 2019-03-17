import * as mongoose from 'mongoose';
import { Article } from '../articles/article.entity';

export const UserSchema = new mongoose.Schema({
    nickname: String,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    introduction: String,
    // @OneToMany((type) => Article, (article) => article.user)
    // public articles: Promise<Article[]>;
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'  } });
