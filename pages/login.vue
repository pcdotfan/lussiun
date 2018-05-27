<template>
    <div class="auth-page uk-height-viewport uk-flex uk-flex-center uk-flex-middle uk-text-center">
        <div class="authenticate-box">
            <auth-tip ref="alert"></auth-tip>
            <form @keydown.enter="login" v-on:submit.prevent="onSubmit">
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
                    <input class="uk-checkbox" type="checkbox" name="remember" v-model="remember"> 记住我</label>
                </li>
                <li class="uk-margin-small-top"> 忘记密码 <a class="uk-link" data-uk-toggle="{ target: '.js-toggle' }">请求密码</a></li>
              </ul>
            </form>
        </div>
  </div>
</template>

<script>
import AuthTip from '../components/AuthTip'
export default {
  name: 'Login',
  middleware: ['auth'],
  components: {
    AuthTip
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      remember: false,
      message: {

      }
    }
  },
  methods: {
    async login () {
      this.error = null
      if (!this.user.username || !this.user.password) {
        return this.$refs.alert.openAlert('请输入用户名和密码', 'warning')
      }
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.user.username,
            password: this.user.password,
            remember: this.remember
          }
        })
        .catch(e => {
          this.$refs.alert.openAlert('用户名或密码错误', 'danger')
        })
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
