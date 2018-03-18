<template>
  <div class="login">
    <div class="uk-container uk-height-viewport uk-flex uk-flex-center uk-flex-middle">
      <div class="login-box">
        <form>
          <vk-card>
            <div>
              <div class="uk-form-row">
                <input class="uk-input uk-margin uk-width-1-1" type="text" name="credentials[username]" value="asdas" placeholder="用户名" autofocus="">
              </div>
              <div class="uk-form-row">
                <input class="uk-input uk-width-1-1" type="password" name="credentials[password]" value="" placeholder="密码">
              </div>
            </div>
            <div slot="footer">
              <vk-button size="large" class="uk-button uk-button-primary uk-width-1-1">登录</vk-button>
            </div>
          </vk-card>
          <ul class="control uk-list uk-text-center">
            <li>
              <label class="uk-form">
                <input type="checkbox" class="uk-checkbox" name="remember_me"> 记住我</label>
            </li>
            <li class="uk-margin-small-top"> 忘记密码 <a class="uk-link" data-uk-toggle="{ target: '.js-toggle' }">请求密码</a></li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
