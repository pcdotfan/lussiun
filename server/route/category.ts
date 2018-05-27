import { index, store, destroy, show, update } from '../controller/admin/CategoriesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/categories',
    method: 'post',
    action: store
  },
  {
    path: '/categories/:id',
    method: 'patch',
    action: update
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
    path: '/categories/:id',
    method: 'delete',
    action: destroy
  }
]
