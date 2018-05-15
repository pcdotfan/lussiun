import { register, login, user, logout } from './controller/UserController'

import { index, store } from './controller/CategoriesController'

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: '/register',
    method: 'post',
    action: register
  },
  {
    path: '/login',
    method: 'post',
    action: login
  },
  {
    path: '/user',
    method: 'get',
    action: user
  },
  {
    path: '/logout',
    method: 'post',
    action: logout
  }

]
