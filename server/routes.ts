import { register, login, user, logout } from './controller/UserController'

import { index, store, destroy } from './controller/CategoriesController'

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
  },
  {
    path: '/category/store',
    method: 'post',
    action: store
  },
  {
    path: '/category/index',
    method: 'get',
    action: index
  },
  {
    path: '/category/destroy',
    method: 'post',
    action: destroy
  }
]
