<template>
    <div>
      <article-list :articles="articles"></article-list>
      <div class="list-pager">
          <router-link :to="{ path: `/page/${page--}` }" v-if="--page !== 0" class="prev">
              <i class="fa fa-angle-left"></i> 上一页
          </router-link>
          <a href="/page/2" class="next">
              下一页 <i class="fa fa-angle-right"></i>
          </a>
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
      articles: []
    }
  },
  async mounted () {
    this.articles = (await this.$axios.get('/articles')).data
  }
}
</script>

<style>
</style>
