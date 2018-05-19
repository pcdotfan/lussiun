import { update } from '../controller/admin/UserController'

/**
 * All application routes.
 */
export default [
  {
    path: '/user/update',
    method: 'post',
    action: update
  }
]
