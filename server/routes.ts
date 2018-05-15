import { register, login, user, logout } from './controller/UserController'

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
  },
  {
    path: '/api/user',
    method: 'get',
    action: user
  },
  {
    path: '/api/logout',
    method: 'post',
    action: logout
  }
]
