<template>
  <div id="backend">
    <header id="header" class="uk-background-primary uk-light">
        <nav class="uk-navbar-primary" uk-navbar uk-sticky="bottom: .hero">
        <div class="uk-navbar-left">
            <a href="#" class="uk-navbar-item uk-logo"><img uk-svg src="~assets/images/uikit-logo.svg" class="uk-margin-small-right">Lussiun</a>
            <ul class="uk-navbar-nav">
            <router-link tag="li" to="/admin/dashboard">
                <a>
                <div class="">
                    控制面板
                    <div class="uk-navbar-subtitle">Dashboard</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/admin/articles">
                <a>
                <div class="">
                    文章
                    <div class="uk-navbar-subtitle">Articles</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/admin/topics">
                <a>
                <div class="">
                    话题
                    <div class="uk-navbar-subtitle">Topics</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/admin/category">
                <a>
                <div class="">
                    分类目录
                    <div class="uk-navbar-subtitle">Category</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/admin/settings">
                <a>
                <div class="">
                    设置
                    <div class="uk-navbar-subtitle">Settings</div>
                </div>
                </a>
            </router-link>
            </ul>
        </div>
        <div class="uk-navbar-right">
            <ul class="navbar-right-controls uk-iconnav">
            <li><a href="#" uk-icon="icon: home; ratio: 0.875"></a></li>
            <li><a href="#" uk-icon="icon: file-edit; ratio: 0.875"></a></li>
            <li><a @click="$auth.logout()" uk-icon="icon: sign-out; ratio: 0.875"></a></li>
            </ul>
            <ul class="uk-navbar-nav">
            <router-link to="/admin/profile" tag="li" exact>
                <a>
                <img class="uk-border-circle uk-margin-small-right" height="32" width="32" :title="user.nickname" :src="avatar"><span v-text="user.nickname"></span>
                </a>
                <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href="#">个人资料</a></li>
                    <li><a @click="$auth.logout()">登出</a></li>
                </ul>
                </div>
            </router-link>
            </ul>
        </div>
        </nav>
    </header>
    <section class="hero uk-section-primary uk-preserve-color">
        <div class="uk-section uk-light">
        <div class="hero-content uk-container uk-container-medium">
            <h2 v-text="hero.title"></h2>
            <p v-text="hero.description"></p>
        </div>
        </div>
        <nav class="hero-navbar uk-navbar-transparent uk-light" v-if="hero.navbarItems">
            <div class="uk-container uk-container-medium">
                <div uk-navbar>
                    <ul class="uk-navbar-nav">
                        <router-link :to="item.path" tag="li" v-for="item in hero.navbarItems" :key="item.title" exact><a v-text="item.title" exact></a></router-link>
                    </ul>
                </div>
            </div>
        </nav>
    </section>
  <nuxt/>
  </div>
</template>

<style lang="less">
@import "../assets/less/uikit.theme.less";
</style>

<script>
import Gravatar from 'gravatar'
export default {
  name: 'Backend',
  middleware: ['auth'],
  data () {
    return {
      user: {
        email: '',
        nickname: '',
        username: '',
        introduction: ''
      }
    }
  },
  mounted () {
    this.fetchUser()
  },
  computed: {
    hero () {
      return this.$store.state.hero
    },
    avatar () {
      return Gravatar.url(this.user.email, { s: '32' })
    }
  },
  methods: {
    async fetchUser () {
      this.user = await this.$axios.$get('/auth/user/basicinfo')
    }
  }
}
</script>

<style>

</style>
