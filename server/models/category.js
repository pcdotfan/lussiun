import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

CategorySchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform (doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
}

mongoose.model('Category', CategorySchema)
