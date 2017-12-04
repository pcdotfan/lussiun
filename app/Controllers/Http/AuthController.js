'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')


class AuthController {

  /**
   * Show register page
   */
  showRegisterPage({ view }) {
    return view.render('auth.register')
  }

  /**
   * Show login page
   */
  showLoginPage({ view }) {
    return view.render('auth.login')
  }

  /**
   * Handle user registration
   */
  async register({ auth, request, response, session }) {
    const rules = {
        username: 'required|unique:users',
        email: 'required|email|unique:users',
        password: 'required',
        password_confirmation: 'required_if:password|same:password',
    }
    const data = request.all()
    const validation = await validate(data, rules)

    // show error messages upon validation fail
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    // persist to database
    const user = await User.create({
      username: data.username,
      email: data.email,
      password: data.password
    })

    // login the user
    await auth.login(user)

    // redirect to homepage
    response.redirect('/')
  }

  async login({ auth, request, response, session }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.attempt(email, password)
      return response.redirect('/')
    } catch (e) {
      session.flash({ error: 'We cannot find any account with these credentials.' })
      return response.redirect('back')
    }
  }

  async logout({ auth, request, response }) {
      await auth.logout()
      response.redirect('/login')
  }
}

module.exports = AuthController
