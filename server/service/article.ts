import { getManager } from 'typeorm'
import { Article } from '../entity/Article'

const articleRepository = getManager().getRepository(Article)

class ArticleService {
  async getById (id) {
    return articleRepository.findOne({ id })
  }
  async getBySlug (slug) {
    return articleRepository.findOne({ slug })
  }
  async getAll (id) {
    return articleRepository.find()
  }
  async getByWhere (whereCondition: Object) {
    return articleRepository.find(whereCondition)
  }
  async removeById (id) {
    return articleRepository.delete(id)
  }
  async newAndSave (body: Object) {
    const newArticle = articleRepository.create(body)
    return articleRepository.save(newArticle)
  }
}

module.exports = ArticleService
