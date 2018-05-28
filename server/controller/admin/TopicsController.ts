import { Context } from 'koa'
import { Topic } from '../../entity/Topic'

export async function index (context: Context) {
  const topics = await context.service.topic.getAll()
  context.body = topics
}

export async function show (context: Context) {
  const topic = await context.service.topic.getById(context.params.id)
  context.body = topic
}

export async function update (context: Context) {
  let { body } = context.request
  try {
    const topicExisted = await context.service.topic.getById(context.params.id)

    if (topicExisted) {
      await context.service.topic.update(context.params.id, body)

      context.status = 200
      context.body = { message: '更新成功' }
    } else {
      context.status = 406
      context.body = { message: '找不到话题' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function destroy (context: Context) {
  try {
    const topicExisted = await context.service.topic.getById(context.params.id)

    if (topicExisted) {
      await context.service.topic.removeById(context.params.id)

      context.status = 200
      context.body = { message: '删除成功' }
    } else {
      context.status = 406
      context.body = { message: '找不到话题' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function store (context: Context) {
  const { body } = context.request // 拿到传入的参数

  try {
    if (!body.name || !body.slug) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }

    const topicExisted = await context.service.topic.getBySlug(body.slug)

    if (!topicExisted) {
      const newTopic = await context.service.topic.newAndSave(body)

      context.status = 200
      context.body = { message: '创建成功', newTopic }
    } else {
      context.status = 406
      context.body = { message: '同别名分类目录已经存在' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}
