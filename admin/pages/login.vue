<template>
    <div class="auth-page uk-height-viewport uk-flex uk-flex-center uk-flex-middle uk-text-center">
        <div class="authenticate-box">
            <auth-tip ref="alert"></auth-tip>
            <div class="uk-card uk-card-default">
            <div class="uk-card-body">
                <div class="auth-item">
                    <input class="uk-input uk-width-1-1" type="text" name="username" v-model="user.username" placeholder="用户名" autofocus="">
                </div>
                <div class="auth-item">
                    <input class="uk-input uk-width-1-1" type="password" name="password" v-model="user.password" placeholder="密码">
                </div>
            </div>
            <button class="uk-button uk-button-primary uk-button-large uk-width-1-1" @click="login">登录</button>
            </div>
            <ul class="uk-list uk-light uk-text-small">
            <li>
                <label class="uk-form">
                <input class="uk-checkbox" type="checkbox" name="remember_me"> 记住我</label>
            </li>
            <li class="uk-margin-small-top"> 忘记密码 <a class="uk-link" data-uk-toggle="{ target: '.js-toggle' }">请求密码</a></li>
            </ul>
        </div>
  </div>
</template>

<script>
import * as types from '~/store/types'
import api from '~/consts/api'
import AuthTip from '../components/AuthTip'
export default {
  name: 'Login',
  middleware: 'redirectWhenAuthenticated',
  components: {
    AuthTip
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      message: {

      }
    }
  },
  methods: {
    async login ({ redirect }) {
      if (!this.user.username || !this.user.password) {
        this.$refs.alert.openAlert('请输入用户名和密码', 'warning')
      } else {
        this.$axios.$post(api.login, this.user)
          .then(response => {
            this.$store.commit(types.LOGIN, response.token)
            this.$store.$router.push({ name: 'backend-dashboard'})
          })
          .catch(error => {
            this.$refs.alert.openAlert('用户名或密码错误', 'danger')
          })
      }
    }
  }
}
</script>

<style>
</style>
