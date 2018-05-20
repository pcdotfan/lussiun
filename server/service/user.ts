import { getManager } from 'typeorm'
import { User } from '../entity/User'

class UserService {
  async getById (id) {
    const UserRepository = getManager().getRepository(User)
    return UserRepository.findOne({ id })
  }
}

module.exports = UserService
