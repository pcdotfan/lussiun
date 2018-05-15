import { index, store, destroy } from '../controller/CategoriesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/category/store',
    method: 'post',
    action: store
  },
  {
    path: '/category/index',
    method: 'get',
    action: index
  },
  {
    path: '/category/destroy',
    method: 'post',
    action: destroy
  }
]
