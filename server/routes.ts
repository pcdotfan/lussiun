import { register, login, user, logout, userBasicInfo, update, changePassword } from './controller/UserController'

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
    path: '/user/update',
    method: 'post',
    action: update
  },
  {
    path: '/user/basicinfo',
    method: 'get',
    action: userBasicInfo
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
    path: '/user/changepassword',
    method: 'post',
    action: changePassword
  },
  {
    path: '/category/destroy',
    method: 'post',
    action: destroy
  }
]
