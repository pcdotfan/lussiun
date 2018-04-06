import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: String,
  content: String,
  publish: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  body: {
    type: String,
    default: ''
  },
  comments: {
    type: Array,
    default: []
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

ArticleSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform (doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
}
// db.articles.update({}, {$set: {flag: 1}}, {multi: 1})
mongoose.model('Article', ArticleSchema)
