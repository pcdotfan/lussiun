<template>
      <main class="uk-container uk-container-small uk-margin">
        <div class="uk-grid-medium" uk-grid>
          <div class="profile-avatar-control">
            <div class="uk-card uk-card-default uk-card-small">
              <div class="uk-card-media-top">
                <img :src="avatar">
              </div>
              <div class="uk-card-body">
                <h4 class="nickname uk-text-center" v-text="user.nickname"></h4>
                <a class="email uk-text-small" v-text="user.email" :href="emailLink"></a>
              </div>
            </div>
          </div>
          <div class="uk-width-expand">
            <div class="basic uk-card-default uk-card-small">
              <div class="uk-card-body">
                <form class="uk-form-stacked">
                  <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                    <div>
                      <label class="uk-form-label" for="form-stacked-text">昵称（必填）</label>
                      <div class="uk-form-controls">
                        <input class="uk-input" type="text" v-model="user.nickname">
                      </div>
                    </div>
                    <div>
                      <label class="uk-form-label" for="form-stacked-text">公开显示为</label>
                      <div class="uk-form-controls">
                        <select class="uk-select">
                            <option v-text="user.nickname"></option>
                            <option v-text="user.username"></option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">E-Mail</label>
                    <div class="uk-form-controls">
                      <input class="uk-input" type="email" v-model="user.email">
                    </div>
                  </div>
                  <!--
                  <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                    <div>
                      <label class="uk-form-label" for="form-stacked-text">微博用户名</label>
                      <div class="uk-form-controls">
                        <input class="uk-input" type="text">
                      </div>
                    </div>
                    <div>
                      <label class="uk-form-label" for="form-stacked-text">微博个人页面</label>
                      <div class="uk-form-controls">
                        <input class="uk-input" type="text">
                      </div>
                    </div>
                  </div>
                  -->
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">个人简介</label>
                    <div class="uk-form-controls">
                      <textarea class="uk-textarea" type="text" placeholder="Some text..." v-model="user.introduction"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="uk-card-footer">
                <p class="uk-text-right">
                  <button class="uk-button uk-button-primary" type="submit" @click="updateProfile()">保存资料</button>
                </p>
              </div>
            </div>
            <div class="account uk-margin uk-card-default uk-card-small">
              <div class="uk-card-body">
                <form class="uk-form-stacked uk-grid-small uk-child-width-1-2" uk-grid>
                  <div>
                    <label class="uk-form-label" for="form-stacked-text">新密码</label>
                    <div class="uk-form-controls">
                      <div class="uk-inline uk-width-1-1">
                        <span class="uk-form-icon uk-form-icon-flip" uk-icon="lock"></span>
                        <input class="uk-input" type="password" v-model="password">
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="uk-form-label" for="form-stacked-text">确认密码</label>
                    <div class="uk-form-controls">
                      <div class="uk-inline uk-width-1-1">
                        <span class="uk-form-icon uk-form-icon-flip" uk-icon="check"></span>
                        <input class="uk-input" type="password" v-model="password_confirmation">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="uk-card-footer">
                <p class="uk-text-right">
                  <button class="uk-button uk-button-danger" type="submit" @click="changePassword()">修改密码</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
</template>
<script>
import UIkit from 'uikit'
import Gravatar from 'gravatar'
export default {
  name: 'ProfileIndex',
  layout: 'backend',
  data () {
    return {
      user: {
        email: '',
        nickname: '',
        username: '',
        introduction: ''
      },
      password: '',
      password_confirmation: ''
    }
  },
  computed: {
    avatar () {
      return Gravatar.url(this.user.email, { s: '250' })
    },
    emailLink () {
      return `mailto:${this.email}`
    }
  },
  mounted () {
    this.fetchUser()
    this.$store.commit('changeHero', {
      title: '个人资料',
      description: '从此无心爱良夜，任他明月下西楼。'
    })
  },
  methods: {
    async fetchUser () {
      this.user = await this.$axios.$get('/auth/user/basicinfo')
    },
    async updateProfile () {
      const user = Object.assign(this.user, { id: this.$auth.user.id })
      await this.$axios.$post('/user/update', user)
        .then(response => {
          UIkit.notification('操作成功', 'success')
        }).catch(error => {
          console.log(error)
          UIkit.notification('出现内部错误', 'danger')
        })
    },
    async changePassword () {
      if (this.password !== this.password_confirmation) {
        UIkit.notification('新密码与确认密码不一致', 'danger')
        return
      }
      await this.$axios.$post('/auth/user/changepassword', { password: this.password })
        .then(response => {
          UIkit.notification('操作成功', 'success')
        }).catch(error => {
          console.log(error)
          UIkit.notification('出现内部错误', 'danger')
        })
    }
  }
}
</script>
