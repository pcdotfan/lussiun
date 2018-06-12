<template>
  <div id="backend">
    <header id="header" class="uk-background-primary uk-light">
        <vk-sticky bottom=".hero">
            <vk-navbar>
                <vk-navbar-nav slot="left">
                    <vk-navbar-logo>
                        <img src="~assets/images/uikit-logo.svg" class="uk-margin-small-right">Lussiun
                    </vk-navbar-logo>
                    <vk-navbar-nav>
                        <router-link tag="li" to="/admin" exact>
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
                        <router-link tag="li" to="/admin/category">
                            <a>
                            <div class="">
                                分类目录
                                <div class="uk-navbar-subtitle">Category</div>
                            </div>
                            </a>
                        </router-link>
                    </vk-navbar-nav>
                </vk-navbar-nav>
                <vk-navbar-nav slot="right">
                    <vk-iconnav class="navbar-right-controls">
                        <vk-iconnav-item icon="home" ratio="0.875"></vk-iconnav-item>
                        <vk-iconnav-item icon="file-edit" ratio="0.875"></vk-iconnav-item>
                        <vk-iconnav-item @click="$auth.logout()" icon="sign-out" ratio="0.875"></vk-iconnav-item>
                    </vk-iconnav>
                    <router-link to="/admin/profile" tag="li" exact>
                        <a class="user-drop">
                            <img class="uk-border-circle uk-margin-small-right" height="32" width="32" :src="avatar">
                            <span v-text="user.nickname"></span>
                        </a>
                        <vk-dropdown target=".user-drop">
                            <vk-nav-dropdown>
                                <vk-nav-item title="个人资料"></vk-nav-item>
                                <vk-nav-item @click="$auth.logout()" title="登出"></vk-nav-item>
                            </vk-nav-dropdown>
                        </vk-dropdown>
                    </router-link>
                </vk-navbar-nav>
            </vk-navbar>
        </vk-sticky>
    </header>
    <section class="hero uk-section-primary uk-preserve-color">
        <div class="uk-section uk-light">
        <div class="hero-content uk-container uk-container-medium">
            <h2 v-text="hero.title"></h2>
            <p v-text="hero.description"></p>
        </div>
        </div>
        <nav class="hero-navbar uk-light" v-if="hero.navbarItems">
            <div class="uk-container uk-container-medium">
                <vk-navbar transparent>
                    <vk-navbar-nav>
                        <router-link :to="item.path" tag="li" v-for="item in hero.navbarItems" :key="item.title" exact>
                            <a v-text="item.title" exact></a>
                        </router-link>
                    </vk-navbar-nav>
                </vk-navbar>
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
import BusyOverlay from '@/components/BusyOverLay'
export default {
  name: 'Backend',
  middleware: ['auth'],
  components: {
    BusyOverlay
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  computed: {
    hero () {
      return this.$store.state.hero
    }
  },
  asyncComputed: {
    user: {
      async get () {
        return this.$axios.$get('/auth/profile')
      },
      default: {
        nickname: '',
        email: ''
      }
    },
    async avatar () {
      return Gravatar.url(this.user.email, { s: '32' })
    }
  }
}
</script>

<style>

</style>
