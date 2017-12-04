'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.get('register', 'AuthController.showRegisterPage')
  Route.post('register', 'AuthController.register')
  Route.get('login', 'AuthController.showLoginPage')
  Route.post('login', 'AuthController.login')
}).middleware(['guest'])

Route.group(() => {
  Route.get('logout', 'AuthController.logout')
  Route.resource('user', 'UserController')
  Route.on('backend').render('backend.home')
}).middleware(['auth'])
