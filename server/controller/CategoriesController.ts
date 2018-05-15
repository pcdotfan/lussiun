import { Context } from 'koa'
import { getManager } from 'typeorm'
import { Category } from '../entity/Category'

export async function index (context: Context) {
  const categoryRepository = getManager().getRepository(Category)
  const categories = await categoryRepository.find()

  context.body = categories
}

export async function store (context: Context) {
  const { body } = context.request // 拿到传入的参数
  const categoryRepository = getManager().getRepository(Category)

  try {
    if (!body.name || !body.slug) {
      context.status = 400
      context.body = { error: `无效的传入参数` }
      return
    }

    const categoryExisted = await categoryRepository.findOne({ slug: body.slug }) // 同步处理

    if (!categoryExisted) {
      const newCategory = categoryRepository.create(body)
      await categoryRepository.save(newCategory)

      context.status = 200
      context.body = { message: '创建成功', newCategory }
    } else {
      context.status = 406
      context.body = { message: '同别名分类目录已经存在' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}
