<template>
    <div class="auth-page uk-height-viewport uk-flex uk-flex-center uk-flex-middle uk-text-center">
        <div class="authenticate-box">
            <auth-tip ref="alert"></auth-tip>
            <form @keydown.enter="login" v-on:submit.prevent="login">
              <div class="uk-card uk-card-default">
                <div class="uk-card-body">
                    <div class="auth-item">
                        <input class="uk-input uk-width-1-1" type="text" name="username" v-model="user.username" placeholder="用户名" autofocus="">
                    </div>
                    <div class="auth-item">
                        <input class="uk-input uk-width-1-1" type="password" name="password" v-model="user.password" placeholder="密码">
                    </div>
                </div>
                <button class="uk-button uk-button-primary uk-button-large uk-width-1-1" type="submit" @keyup.enter="login"  @click="login">登录</button>
              </div>
              <ul class="uk-list uk-light uk-text-small">
                <li>
                    <label class="uk-form">
                    <input class="uk-checkbox" type="checkbox" name="remember" v-model="remember"> 记住我</label>
                </li>
              </ul>
            </form>
        </div>
  </div>
</template>

<script>
import AuthTip from '@/components/AuthTip'
export default {
  name: 'Login',
  auth: false,
  components: {
    AuthTip
  },
  head () {
    return {
      title: '登录' + ' | ' + this.$nuxt.$options.head.title
    }
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      error: null,
      remember: false,
      message: {

      }
    }
  },
  methods: {
    async login () {
      try {
        this.error = null
        if (!this.user.username || !this.user.password) {
          return this.$refs.alert.openAlert('请输入用户名和密码', 'warning')
        }
        await this.$auth
          .loginWith('local', {
            data: {
              username: this.user.username,
              password: this.user.password,
              remember: this.remember
            }
          })
        this.$router.push('/')
      } catch (e) {
        this.$refs.alert.openAlert(e.data.message, 'danger')
      }
    }
  }
}
</script>

<style>
</style>
