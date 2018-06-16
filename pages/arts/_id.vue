<template>
  <div>
    <article class="content">
      <h1 v-text="article.title"></h1>
      <div class="meta">
          <span class="item">
              <i class="fa fa-calendar-o"></i>
              <time :datetime="getDate(article.updatedAt)" v-text="getDate(article.updatedAt)"></time>
          </span>
          <span class="item">
              <i class="fa fa-code"></i>
              <a href="/category/writing" v-text="article.__category__.name"></a>
          </span>
          <span class="item">
              <i class="fa fa-comment-o"></i>
              <a href="/post/writing/2018-04-19-23-50-51#comments">{{ article.commentCount }} 评</a>
          </span>
      </div>
      <div class="post" v-html="getRendered(article.content)">
      </div>
    </article>
    <section class="pager">
      <a href="/post/writing/2018-04-19-23-50-51" class="pre">2018-04-19 23-50-51</a>
      <a href="/post/writing/put-the-best-yourself-into-the-situation-someone-when-needs-you-most" class="next">??</a>
    </section>
    <comment-section></comment-section>
  </div>
</template>

<script>
import CommentSection from '@/components/CommentSection'
const MarkdownIt = require('markdown-it')
const moment = require('moment')
const md = new MarkdownIt()
export default {
  name: 'Article',
  components: {
    CommentSection
  },
  data () {
    return {
      article: {
        title: '',
        __category__: {}
      },
      id: 0
    }
  },
  head () {
    return {
      title: this.article.title + ' | ' + this.$nuxt.$options.head.site.title
    }
  },
  methods: {
    getRendered (mdContent) {
      return md.render(String(mdContent))
    },
    getDate (date) {
      return moment(date).format('YYYY.MM.DD')
    }
  },
  async mounted () {
    this.id = Number(this.$route.params.id)
    this.article = (await this.$axios.get(`/articles/${this.id}`)).data
  }
}
</script>

<style>
</style>
