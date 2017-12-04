'use strict'

class UserController {
  show({ id, view }) {
    return view.render('user.show')
  }
}

module.exports = UserController
