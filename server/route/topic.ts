import { index, store, destroy, show } from '../controller/admin/TopicsController'

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
    path: '/topics/destroy',
    method: 'post',
    action: destroy
  }
]
