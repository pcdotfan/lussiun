import { index } from '../controller/admin/ArticlesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/articles/index',
    method: 'get',
    action: index
  }
]
