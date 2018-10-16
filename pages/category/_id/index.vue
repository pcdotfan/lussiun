<template>
    <section>
        <section class="content">
            <h1 v-text="category.name"></h1>
            <div class="meta" v-text="'此类别下共有' + category.count + '篇文章'"></div>
        </section>
        <article-list :articles="articles"></article-list>
        <div class="list-pager">
            <router-link :to="{ path: `/category/${id}/page/2` }" v-if="nextAvailable" class="next">
                下一页 <i class="fa fa-angle-right"></i>
            </router-link>
            <div class="is-clearfix"></div>
        </div>
    </section>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
  name: 'Category',
  components: {
    ArticleList
  },
  data () {
    return {
      id: Number(this.$route.params.id),
      nextAvailable: false
    }
  },
  head () {
    return {
      title: this.category.name + ' | ' + this.$nuxt.$options.head.site.title,
      meta: [
        { hid: 'description', name: 'description', content: this.category.description }
      ]
    }
  },
  async asyncData ({ app, params }) {
    const category = (await app.$axios.get(`/categories/${params.id}`)).data
    const articles = (await app.$axios.get(`/articles/?cat=${params.id}`)).data
    return { category, articles }
  },
  async mounted () {
    const nextArticles = (await this.$axios.$get(`/articles/?cat=${this.id}&page=2`))
    if (nextArticles.length !== 0) {
      this.nextAvailable = true
    }
  }
}
</script>

<style>
</style>
