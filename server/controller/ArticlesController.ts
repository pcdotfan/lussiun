import { Context } from 'koa'
import { getManager } from 'typeorm'
import { Article } from '../entity/Article'

export async function index (context: Context) {
  const articleRepository = getManager().getRepository(Article)
  const articles = await articleRepository.find()

  context.body = articles
}

export async function destroy (context: Context) {
  const { body } = context.request // 拿到传入的参数
  const articleRepository = getManager().getRepository(Article)

  try {
    if (!body.id) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }

    const articleExisted = await articleRepository.findOne({
      id: body.id
    }) // 同步处理

    if (articleExisted) {
      await articleRepository.delete(body.id)
    }
    context.status = 200
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function store (context: Context) {
  const { body } = context.request // 拿到传入的参数
  const articleRepository = getManager().getRepository(Article)

  try {
    if (!body.title || !body.slug || !body.content || !body.categoryId || !body.status) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }

    body.userId = context.state.user.id
    const articleExisted = await articleRepository.findOne({ slug: body.slug }) // 同步处理

    if (!articleExisted) {
      const newArticle = articleRepository.create(body)
      await articleRepository.save(newArticle)

      context.status = 200
      context.body = { message: '创建成功', newArticle }
    } else {
      context.status = 406
      context.body = { message: '同别名文章已经存在' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function mockData (context: Context) {
  let faker = require('faker')
  const count = 20
  const articleRepository = getManager().getRepository(Article)
  for (let i = 0; i <= count; i++) {
    let structure = {
      userId: 1,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      status: getRandomInt(-1, 2),
      categoryId: getRandomInt(14, 17),
      slug: faker.lorem.word()
    }
    let newArticle = articleRepository.create(structure)
    await articleRepository.save(newArticle)
  }
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}
