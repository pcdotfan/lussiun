import { getManager } from 'typeorm'
import { Category } from '../entity/Category'

const categoryRepository = getManager().getRepository(Category)
const _ = require('lodash')

class CategoryService {
  async getById (id) {
    return categoryRepository.findOne({ id })
  }
  async getBySlug (slug) {
    return categoryRepository.findOne({ slug })
  }
  async getAll (id) {
    return categoryRepository.find()
  }
  async getByWhere (whereCondition: Object) {
    return categoryRepository.find(whereCondition)
  }
  async removeById (id) {
    return categoryRepository.delete(id)
  }
  async newAndSave (body: Object) {
    const newCategory = categoryRepository.create(body)
    return categoryRepository.save(newCategory)
  }
  async update (id: number, body: Object) {
    body = _.omit(body, ['id'])
    return categoryRepository.update(id, body)
  }
}

module.exports = CategoryService
