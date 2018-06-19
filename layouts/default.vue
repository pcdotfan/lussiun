<template>
<div class="container">
    <main>
        <div class="column is-9 is-center">
            <div class="card">
              <div class="card-content">
                <header>
                  <div class="left media">
                    <router-link to="/" class="logo">
                        <img :src="logo" class="media-left">
                    </router-link>
                    <div class="description media-content">
                        <h1 v-text="title"></h1>
                        <h2 v-text="description"></h2>
                    </div>
                  </div>
                  <nav>
                    <ul>
                        <li>
                            <router-link to="/" class="selected active current nav__item">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/category/1" class="selected active current nav__item">JavaScript</router-link>
                        </li>
                        <li>
                            <router-link to="/category/2" class="selected active current nav__item">Laravel</router-link>
                        </li>
                    </ul>
                  </nav>
                </header>
                <nuxt />
              </div>
            </div>
            <aside class="is-center">
              <div class="columns is-gapless">
                <div class="aside-left column is-8">
                    <h3>最新文章</h3>
                    <ul class="columns is-multiline is-gapless">
                        <li class="column is-half" :key="article.id" v-for="article in recentArticles">
                            <router-link :to="'/arts/' + article.id" v-text="article.title"></router-link>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="aside-right column is-4">
                    <h3>分门别类</h3>
                    <ul class="columns is-multiline is-gapless">
                        <li class="column is-half" v-for="category in categories" :key="category.id">
                            <router-link :to="'/category/' + category.id" v-text="category.name"></router-link>
                            <span v-text="category.count + '篇'"></span>
                        </li>
                    </ul>
                </div>
              </div>
            </aside>
            <footer class="is-center">
              <span>© 2018 {{ title }} -</span>
              <span> ♥
                  <a href="https://blog.shuiba.co/bitcron-theme-hello">Hello Redesigned</a>
              </span>
              <div class="powered-by">
                  <span>Proudly published with </span>
                  <a href="https://github.com/pcdotfan/lussiun" target="_blank">Lussiun</a>
              </div>
              <div class="footer-slogan">
                  <img src="~assets/images/slogan.svg">
              </div>
          </footer>
        </div>
    </main>
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
