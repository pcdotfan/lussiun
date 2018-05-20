import { update, show } from '../controller/admin/UserController'

/**
 * All application routes.
 */
export default [
  {
    path: '/user/update',
    method: 'post',
    action: update
  },
  {
    path: '/user/:id',
    method: 'get',
    action: show
  }
]
