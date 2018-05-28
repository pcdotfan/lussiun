import { index, store, destroy, show, update } from '../controller/admin/TopicsController'

/**
 * All application routes.
 */
export default [
  {
    path: '/topics',
    method: 'post',
    action: store
  },
  {
    path: '/topics',
    method: 'get',
    action: index
  },
  {
    path: '/topics/:id',
    method: 'get',
    action: show
  },
  {
    path: '/topics/:id',
    method: 'patch',
    action: update
  },
  {
    path: '/topics/:id',
    method: 'delete',
    action: destroy
  }
]
