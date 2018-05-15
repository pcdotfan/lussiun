import { Context } from 'koa'
import { getManager } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { User } from '../entity/User'

const bcrypt = require('bcrypt')

export async function get (context: Context) {
  const { body } = context.request // 拿到传入的参数
  const userRepository = getManager().getRepository(User)
  try {
    if (!body.id) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }

    let userExisted = await userRepository.findOne({
      id: body.id
    }) // 同步处理

    if (userExisted) {
      context.status = 200
      context.body = { userExisted }
    } else {
      context.status = 406
      context.body = { message: '无效用户' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function update (context: Context) {
  const { body } = context.request // 拿到传入的参数
  const userRepository = getManager().getRepository(User)

  try {
    if (!body.id) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }

    let userExisted = await userRepository.findOne({
      id: body.id
    }) // 同步处理

    if (userExisted) {
      userExisted = Object.assign(userExisted, body)
      await userRepository.save(userExisted)

      context.status = 200
      context.body = { message: '更改成功' }
    } else {
      context.status = 406
      context.body = { message: '无效用户' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

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
      const token = sign(
        { id: userExisted.id },
        secret,
        { expiresIn: '1h' }
      )
      context.status = 200
      context.body = { token }
    } else {
      context.status = 401
      context.body = { message: '用户名或密码错误' }
    }
  } catch (error) {
    console.log(error)
    context.throw(500)
  }
}

export async function logout (context: Context) {
  try {
    context.status = 200
    context.body = {
      status: 'OK'
    }
  } catch (error) {
    context.throw(500)
  }
}

export async function user (context: Context) {
  context.body = { user: { id: context.state.user.id } }
}

export async function userBasicInfo (context: Context) {
  context.body = { user: { id: context.state.user.id } }
}
