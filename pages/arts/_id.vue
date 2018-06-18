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
              <router-link :to="'/categories/' + article.categoryId" v-text="article.__category__.name"></router-link>
          </span>
          <span class="item">
              <i class="fa fa-comment-o"></i>
              <a href="#comments">{{ article.commentCount }} ?</a>
          </span>
      </div>
      <div class="post" v-html="getRendered(article.content)">
      </div>
    </article>
    <comment-section :article="id"></comment-section>
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
      id: Number(this.$route.params.id)
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
    this.article = (await this.$axios.get(`/articles/${this.id}`)).data
  }
}
</script>

<style>
</style>
