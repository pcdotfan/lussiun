import { getManager } from 'typeorm'
import { Category } from '../entity/Category'

class CategoryService {
  async getById (id) {
    const categoryRepository = getManager().getRepository(Category)
    return categoryRepository.findOne({ id })
  }
  async getBySlug (slug) {
    const categoryRepository = getManager().getRepository(Category)
    return categoryRepository.findOne({ slug })
  }
}

module.exports = CategoryService
