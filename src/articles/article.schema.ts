import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';
import { Enum } from 'protobufjs';

export const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: Enum, // DELETED：已删除 DRAFT: 草稿; MODERATED: 待审核 PUBLISHED: 已发布
        required: true,
    },
    categoryId: ObjectId,
    userId: ObjectId,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'  } });
