import { Context } from 'koa'
import { getManager } from 'typeorm'
import { sign, verify } from 'jsonwebtoken'
import { User } from '../entity/User'

const bcrypt = require('bcrypt')

export async function register (context: Context) {
  const { body } = context.request // 拿到传入的参数
  const userRepository = getManager().getRepository(User)

  try {
    if (!body.username || !body.password || !body.email) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }
    body.password = await bcrypt.hash(body.password, 5)

    const userExisted = await userRepository.findOne({ username: body.username }) // 同步处理

    if (!userExisted) {
      const newUser = userRepository.create(body)
      await userRepository.save(newUser)

      context.status = 200
      context.body = { message: '注册成功', newUser }
    } else {
      context.status = 406
      context.body = { message: '用户名已经存在' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function login (context: Context) {
  const secret = 'vy1C%iZ8W+`]X9#vQl}:/78ul:,CjXcV5{%b-W|_Nty$tGbDnaRGRpJ]e_MkR+O0'
  const { body } = context.request // 拿到传入的参数
  const userRepository = getManager().getRepository(User)
  try {
    const userExisted = await userRepository.findOne({ username: body.username })
    if (userExisted && await bcrypt.compare(body.password, userExisted.password)) {
      const token = sign({
        data: userExisted,
        // 设置 token 过期时间
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 60 seconds * 60 minutes = 1 hour
      }, secret)
      context.status = 200
      context.body = {
        message: '登录成功',
        token
      }
    } else {
      context.status = 401
      context.body = { message: '用户名或密码错误' }
    }
  } catch (error) {
    console.log(error)
    context.throw(500)
  }
}

export async function user (context: Context) {
  //
}
