import { index, show } from '../controller/admin/ArticlesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/articles/',
    method: 'get',
    action: index
  },
  {
    path: '/articles/:id',
    method: 'get',
    action: show
  }
]
