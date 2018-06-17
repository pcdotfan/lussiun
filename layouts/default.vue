<template>
<div>
    <header>
      <router-link to="/" class="logo">
          <img :src="logo">
      </router-link>
      <div class="description">
          <h1 v-text="title"></h1>
          <h2 v-text="description"></h2>
          <nav>
              <div class="bitcron_nav_container">
                  <div class="bitcron_nav">
                      <div class="mixed_site_nav_wrap site_nav_wrap">
                          <ul class="mixed_site_nav site_nav sm sm-base">
                              <li>
                                  <router-link to="/" class="selected active current nav__item">首页</router-link>
                              </li>
                              <li>
                                  <a id="db8d7d8006ed911e885290242ac110004" href="/archive" class=" nav__item">归档</a>
                              </li>
                              <li>
                                  <a id="db8d7e5de6ed911e885290242ac110004" href="/feed" class=" nav__item">订阅</a>
                              </li>
                          </ul>
                          <div class="clear clear_nav_inline_end"></div>
                      </div>
                  </div>
                  <div class="clear clear_nav_end"></div>
              </div>
          </nav>
      </div>
  </header>
  <div class="wrapper">
    <main>
        <nuxt />
    </main>
  </div>
  <aside>
    <div class="aside-left sidebar">
        <h3>最新文章</h3>
        <ul>
            <li :key="article.id" v-for="article in recentArticles">
                <router-link :to="'/arts/' + article.id" v-text="article.title"></router-link>
            </li>
        </ul>
        <div class="clear"></div>
    </div>
    <div class="aside-right sidebar">
        <h3>分门别类</h3>
        <ul>
            <li v-for="category in categories" :key="category.id">
                <router-link :to="'/category/' + category.id" v-text="category.name"></router-link>
                <span v-text="category.count + '篇'"></span>
            </li>
        </ul>
    </div>
  </aside>
  <footer>
    <span>© 2018 {{ title }} -
    </span>
    <span> ♥
        <a href="https://blog.shuiba.co/bitcron-theme-hello">Hello Redesigned</a>
    </span>
    <div class="powered_by">
        <span>Proudly published with </span>
        <a href="https://github.com/pcdotfan/lussiun" target="_blank">Lussiun</a>
    </div>
    <div class="footer_slogan">
        <img src="~assets/images/slogan.svg">
    </div>
</footer>
</div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
  name: 'Default',
  data () {
    return {
      title: this.$nuxt.$options.head.site.title,
      logo: this.$nuxt.$options.head.site.logo,
      description: this.$nuxt.$options.head.site.description,
      recentArticles: [],
      categories: []
    }
  },
  components: {
    ArticleList
  },
  async mounted () {
    this.recentArticles = (await this.$axios.get('/articles')).data
    this.categories = (await this.$axios.get('/categories')).data
  }
}
</script>
