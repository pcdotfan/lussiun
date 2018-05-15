import { update } from '../controller/UserController'

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
