import { index, test } from '../controller/admin/ArticlesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/articles/index',
    method: 'get',
    action: index
  },
  {
    path: '/articles/test',
    method: 'get',
    action: test
  }
]
