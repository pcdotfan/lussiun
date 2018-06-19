<template>
    <div>
      <article-list :articles="articles"></article-list>
      <div class="list-pager">
          <router-link :to="{ path: `/page/${page - 1}` }" v-if="page - 1 !== 0" class="prev">
              <i class="fa fa-angle-left"></i> 上一页
          </router-link>
          <router-link :to="{ path: `/page/${page + 1}` }" v-if="nextAvailable" class="next">
              下一页 <i class="fa fa-angle-right"></i>
          </router-link>
          <div class="clear"></div>
      </div>
    </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
  name: 'Paged',
  components: {
    ArticleList
  },
  data () {
    return {
      page: 0,
      nextAvailable: false
    }
  },
  async asyncData ({ app, params }) {
    let data = (await app.$axios.get(`/articles/?page=${params.paged}`)).data
    return { articles: data }
  },
  async mounted () {
    this.page = Number(this.$route.params.paged)
    this.articles = (await this.$axios.get(`/articles/?page=${this.page}`)).data
    const nextArticles = await this.$axios.$get(`/articles/?page=${this.page + 1}`)
    if (nextArticles.length !== 0) {
      this.nextAvailable = true
    }
  }
}
</script>

<style>
</style>
