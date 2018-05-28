import { Context } from 'koa'
import { Category } from '../../entity/Category'

export async function index (context: Context) {
  const categories = await context.service.category.getAll()
  context.body = categories
}

export async function show (context: Context) {
  const category = await context.service.category.getById(context.params.id)
  context.body = category
}

export async function update (context: Context) {
  let { body } = context.request
  try {
    const categoryExisted = await context.service.category.getById(context.params.id)

    if (categoryExisted) {
      await context.service.category.update(context.params.id, body)

      context.status = 200
      context.body = { message: '更新成功' }
    } else {
      context.status = 406
      context.body = { message: '找不到分类' }
    }
  } catch (error) {
    context.status = 500
    context.body = { error: error }
  }
}

export async function destroy (context: Context) {
  try {
    const categoryExisted = await context.service.category.getById(context.params.id)

    if (categoryExisted) {
      await context.service.category.removeById(context.params.id)

      context.status = 200
      context.body = { message: '删除成功' }
    } else {
      context.status = 406
      context.body = { message: '找不到分类' }
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

    const categoryExisted = await context.service.category.getBySlug(body.slug)

    if (!categoryExisted) {
      const newCategory = await context.service.category.newAndSave(body)

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
