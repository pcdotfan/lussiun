import { getManager } from 'typeorm'
import { Topic } from '../entity/Topic'

const topicRepository = getManager().getRepository(Topic)

class TopicService {
  async getById (id) {
    return topicRepository.findOne({ id })
  }
  async getBySlug (slug) {
    return topicRepository.findOne({ slug })
  }
  async getAll (id) {
    return topicRepository.find()
  }
  async getByWhere (whereCondition: Object) {
    return topicRepository.find(whereCondition)
  }
  async removeById (id) {
    return topicRepository.delete(id)
  }
  async newAndSave (body: Object) {
    const newTopic = topicRepository.create(body)
    return topicRepository.save(newTopic)
  }
}

module.exports = TopicService
