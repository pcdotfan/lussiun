<template>
  <div id="backend">
    <header id="header" class="uk-background-primary uk-light">
        <nav class="uk-navbar-primary" uk-navbar uk-sticky="bottom: .hero">
        <div class="uk-navbar-left">
            <a href="#" class="uk-navbar-item uk-logo"><img uk-svg src="~assets/images/uikit-logo.svg" class="uk-margin-small-right">Lussiun</a>
            <ul class="uk-navbar-nav">
            <router-link tag="li" to="/backend/dashboard">
                <a>
                <div class="">
                    控制面板
                    <div class="uk-navbar-subtitle">Dashboard</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/backend/articles">
                <a>
                <div class="">
                    文章
                    <div class="uk-navbar-subtitle">Articles</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/backend/topics">
                <a>
                <div class="">
                    话题
                    <div class="uk-navbar-subtitle">Topics</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/backend/category">
                <a>
                <div class="">
                    分类目录
                    <div class="uk-navbar-subtitle">Category</div>
                </div>
                </a>
            </router-link>
            <router-link tag="li" to="/backend/settings">
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
            <li><a @click="logout" uk-icon="icon: sign-out; ratio: 0.875"></a></li>
            </ul>
            <ul class="uk-navbar-nav">
            <router-link to="/backend/profile" tag="li" exact>
                <a>
                <img class="uk-border-circle uk-margin-small-right" height="32" width="32" title="wwy701" src="https://avatars1.githubusercontent.com/u/3370745?s=460"><span>wwy701</span>
                </a>
                <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href="#">个人资料</a></li>
                    <li><a @click="logout">登出</a></li>
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
            <h2 v-text="heroTitle"></h2>
            <p v-text="heroDescription"></p>
        </div>
        </div>
        <nav class="hero-navbar uk-navbar-transparent uk-light" v-if="heroNavbarItems">
            <div class="uk-container uk-container-medium">
                <div uk-navbar>
                    <ul class="uk-navbar-nav">
                        <router-link :to="item.path" tag="li" v-for="item in heroNavbarItems" :key="item.title"><a v-text="item.title" exact></a></router-link>
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

<style lang="scss">
@import "../assets/sass/element-ui/index.scss";
</style>

<script>
import * as types from "~/store/types";
export default {
  name: 'Backend',
  middleware: 'auth',
  data () {
    return {
    }
  },
  async asyncData ({ store }) {
    let data = await store.dispatch('USER_INFO')
    if (data.success) {
      return {
        user: data.data
      }
    } else {
      return {
        user: {}
      }
    }
  },
  mounted() {
    if (window.localStorage.getItem('token')) {
        this.$store.commit(types.LOGIN, window.localStorage.getItem('token'))
    }
  },
  computed: {
    heroTitle () {
      return this.$store.state.heroTitle
    },
    heroDescription () {
      return this.$store.state.heroDescription
    },
    heroNavbarItems () {
      return this.$store.state.heroNavbarItems
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT').then(data => {
        if (data.success) {
          this.$store.state.token = ''
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>


<style>

</style>
