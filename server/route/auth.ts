import { register, login, user, logout, userBasicInfo, update, changePassword } from '../controller/UserController'

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
    path: '/login',
    method: 'post',
    action: login
  },
  {
    path: '/auth/user',
    method: 'get',
    action: user
  },
  {
    path: '/logout',
    method: 'post',
    action: logout
  },
  {
    path: '/auth/user/changepassword',
    method: 'post',
    action: changePassword
  }
]
