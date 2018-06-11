<template>
      <main class="uk-container uk-container-small uk-margin">
        <vk-grid>
          <div class="profile-avatar-control">
            <vk-card padding="small">
              <div slot="media-top">
                <img :src="avatar">
              </div>
              <h4 class="nickname uk-text-center" v-text="user.nickname"></h4>
              <a class="email uk-text-small" v-text="user.email" :href="emailLink"></a>
            </vk-card>
          </div>
          <div class="uk-width-expand">
            <vk-card padding="small">
              <form class="uk-form-stacked">
                <vk-grid gutter="small" class="uk-child-width-1-2">
                  <div>
                    <label class="uk-form-label" for="nickname">昵称</label>
                    <div class="uk-form-controls">
                      <input class="uk-input" type="text" name="nickname" v-model="user.nickname">
                    </div>
                  </div>
                  <div>
                    <label class="uk-form-label" for="username">用户名</label>
                    <div class="uk-form-controls">
                      <input class="uk-input" type="text" name="username" :value="user.username" disabled>
                    </div>
                  </div>
                </vk-grid>
                <div class="uk-margin">
                  <label class="uk-form-label" for="email">E-Mail</label>
                  <div class="uk-form-controls">
                    <input class="uk-input" type="email" name="email" v-model="user.email">
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="introduction">个人简介</label>
                  <div class="uk-form-controls">
                    <textarea class="uk-textarea" name="introduction" type="text" v-model="user.introduction"></textarea>
                  </div>
                </div>
              </form>
              <div slot="footer">
                <p class="uk-text-right">
                  <button class="uk-button uk-button-primary" @click="updateProfile">保存资料</button>
                </p>
              </div>
            </vk-card>
            <vk-card padding="small" class="account uk-margin">
              <form class="uk-form-stacked">
                <vk-grid gutter="small" class="uk-child-width-1-2">
                  <div>
                    <label class="uk-form-label" for="form-stacked-text">新密码</label>
                    <div class="uk-form-controls">
                      <div class="uk-inline uk-width-1-1">
                        <vk-icon class="uk-form-icon uk-form-icon-flip" icon="lock"></vk-icon>
                        <input class="uk-input" type="password" v-model="password">
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="uk-form-label" for="form-stacked-text">确认密码</label>
                    <div class="uk-form-controls">
                      <div class="uk-inline uk-width-1-1">
                        <vk-icon class="uk-form-icon uk-form-icon-flip" icon="check"></vk-icon>
                        <input class="uk-input" type="password" v-model="password_confirmation">
                      </div>
                    </div>
                  </div>
                </vk-grid>
              </form>
              <div slot="footer">
                <p class="uk-text-right">
                  <button class="uk-button uk-button-danger" @click="changePassword">修改密码</button>
                </p>
              </div>
            </vk-card>
          </div>
        </vk-grid>
      </main>
</template>
<script>
import Gravatar from 'gravatar'
export default {
  name: 'ProfileIndex',
  layout: 'backend',
  data () {
    return {
      user: {
        username: '',
        introduction: '',
        nickname: '',
        email: ''
      },
      password: '',
      password_confirmation: ''
    }
  },
  computed: {
    emailLink () {
      return `mailto:${this.user.email}`
    }
  },
  asyncComputed: {
    async avatar () {
      return Gravatar.url(this.user.email, { s: '250' })
    }
  },
  async mounted () {
    this.user = await this.$axios.$get('/auth/profile')
    this.$store.commit('changeHero', {
      title: '个人资料',
      description: '从此无心爱良夜，任他明月下西楼。'
    })
  },
  methods: {
    async updateProfile () {
      return this.$axios.$patch(`/users/${this.$auth.user.id}`, this.user)
        .then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        })
        .catch(() => {
          this.$notify({
            title: '失败',
            message: '出现内部错误',
            type: 'warning'
          })
        })
    },
    async changePassword () {
      if (this.password !== this.password_confirmation) {
        this.$message.error('新密码与确认密码不一致')
        return
      }
      await this.$axios.$post('/auth/changepassword', { password: this.password })
        .then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          this.$notify({
            title: '失败',
            message: '出现内部错误',
            type: 'warning'
          })
        })
    }
  }
}
</script>
