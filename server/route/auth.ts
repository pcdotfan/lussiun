import { register, login, user, logout, userBasicInfo, changePassword } from '../controller/UserController'
import { mockData } from '../controller/ArticlesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/register',
    method: 'post',
    action: register
  },
  {
    path: '/auth/login',
    method: 'post',
    action: login
  },
  {
    path: '/auth/user',
    method: 'get',
    action: user
  },
  {
    path: '/auth/user/basicinfo',
    method: 'get',
    action: userBasicInfo
  },
  {
    path: '/auth/logout',
    method: 'post',
    action: logout
  },
  {
    path: '/auth/user/changepassword',
    method: 'post',
    action: changePassword
  },
  {
    path: '/auth/mockdata',
    method: 'get',
    action: mockData
  }
]
