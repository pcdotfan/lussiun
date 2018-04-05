<template>
    <div class="auth-page uk-height-viewport uk-flex uk-flex-center uk-flex-middle uk-text-center">
        <div class="authenticate-box">
        <div class="uk-alert-danger" uk-alert>
            <p>用户名或密码错误。</p>
        </div>
        <form class="uk-form" method="post" aria-hidden="false">
            <div class="uk-card uk-card-default">
            <div class="uk-card-body">
                <div class="form-item">
                <input class="uk-input uk-width-1-1" type="text" name="credentials[username]" value="" placeholder="用户名" autofocus="">
                </div>
                <div class="form-item">
                <input class="uk-input uk-width-1-1" type="password" name="credentials[password]" value="" placeholder="密码">
                </div>
            </div>
            <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">登录</button>
            </div>
            <ul class="uk-list uk-light uk-text-small">
            <li>
                <label class="uk-form">
                <input class="uk-checkbox" type="checkbox" name="remember_me"> 记住我</label>
            </li>
            <li class="uk-margin-small-top"> 忘记密码 <a class="uk-link" data-uk-toggle="{ target: '.js-toggle' }">请求密码</a></li>
            </ul>
        </form>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style>
</style>
