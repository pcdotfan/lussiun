import { register, login } from './controller/UserController'

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: '/api/register',
    method: 'post',
    action: register
  },
  {
    path: '/api/login',
    method: 'post',
    action: login
  }
]
