import { getManager } from 'typeorm'
import { Article } from '../entity/Article'

class ArticleService {
  async getById (id) {
    const articleRepository = getManager().getRepository(Article)
    return articleRepository.findOne({ id })
  }
  async getBySlug (slug) {
    const articleRepository = getManager().getRepository(Article)
    return articleRepository.findOne({ slug })
  }
}

module.exports = ArticleService
