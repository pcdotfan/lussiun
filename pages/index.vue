<template>
    <div>
      <article-list :articles="articles"></article-list>
      <div class="list-pager">
          <router-link :to="{ path: `/page/2` }" v-if="nextAvailable" class="next">
            下一页 <i class="fa fa-angle-right"></i>
          </router-link>
          <div class="clear"></div>
      </div>
    </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
  name: 'Index',
  components: {
    ArticleList
  },
  data () {
    return {
      nextAvailable: false
    }
  },
  async asyncData ({ app, params }) {
    let data = (await app.$axios.get(`/articles/`)).data
    return { articles: data }
  },
  async mounted () {
    const nextArticles = await this.$axios.$get(`/articles/?page=2`)
    if (nextArticles.length !== 0) {
      this.nextAvailable = true
    }
  }
}
</script>

<style>
</style>
