import { index, store, destroy, show } from '../controller/admin/CategoriesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/categories/store',
    method: 'post',
    action: store
  },
  {
    path: '/categories',
    method: 'get',
    action: index
  },
  {
    path: '/categories/:id',
    method: 'get',
    action: show
  },
  {
    path: '/categories/destroy',
    method: 'post',
    action: destroy
  }
]
