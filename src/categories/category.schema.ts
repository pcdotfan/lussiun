import * as mongoose from 'mongoose';

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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'  } });
